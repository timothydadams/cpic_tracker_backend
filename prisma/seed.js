//import { PrismaClient } from '@prisma/client';
import { PrismaClient } from './generated/prisma/index.js'
import { withAccelerate } from '@prisma/extension-accelerate'
import csv from 'csvtojson';
import { hashPassword } from '../server/utils/auth.js';
import fs from 'fs';
import { join } from 'path';
import { 
    clean_rows, 
    town_committees_boards, 
    town_departments, 
    school_orgs 
} from './csv_cleanup.js';

const prisma = new PrismaClient().$extends(withAccelerate())

const csv_path = join(process.cwd(), "cpic_strategy_list.csv");

const csvContents = await csv().fromFile(csv_path);

console.log('CSV Example entry:', csvContents[0]);

const normalized_data = clean_rows(csvContents);


const writer = fs.createWriteStream(
    join(process.cwd(),'logs','seed_errors.txt'), 
    {
        flags: 'a',
        encoding: 'utf8',
    }
);

const addTimelineEntries = async () => {
    try {
        const entries = await prisma.timelineOptions.createMany({
            data: [
                { title: "Ongoing"},
                { title: "Short-Term"},
                { title: "Mid-Term"},
                { title: "Long-Term"},
            ]
        })
        console.log("created entries", entries);
    } catch(e) {
        console.log(`Error: ${e}`);
        writer.write(`Error: ${e}\n`);
    }

    return true;
}

const addRoles = async() => {
    try {
        const entries = await prisma.role.createMany({
            data: [
                { name: "Admin", description:"global admin"},
                { name: "CPIC Admin", description:"CPIC Board Chair or Co-Chair"},
                { name: "CPIC Member", description:"member of CPIC board"},
                { name: "Implementer", description:"strategy implementer"},
                { name: "Viewer", description:"standard user" }
            ]
        })
        console.log("created entries", entries);
    } catch(e) {
        console.log(`Error: ${e}`);
        writer.write(`Error: ${e}\n`);
    }

    return true;
}

const addStatusEntries = async () => {
    try {
        const entries = await prisma.statusOptions.createMany({
            data: [
                { title: "Needs Updating"},
                { title: "In Progress"},
                { title: "Completed"},
            ]
        })
        console.log("created entries", entries);
    } catch(e) {
        console.log(`Error: ${e}`);
        writer.write(`Error: ${e}\n`);
    }

    return true;
}

const addFocusAreas = async() => {
    const uniqueFocusAreas = csvContents.filter((obj, index, self) =>
        index === self.findIndex((t) => t["Recommendation Area"] === obj["Recommendation Area"])
    );

    try {
        const entries = await prisma.focusArea.createMany({
            data: uniqueFocusAreas.map(x => {
                return {name: x["Recommendation Area"]}
            })
        })
        console.log("created entries", entries);
    } catch(e) {
        console.log(`Error: ${e}`);
        writer.write(`Error: ${e}\n`);
    }

    return true;
}

const addPolicies = async() => {
    let count = 0;
    await Promise.all(
        csvContents.map(async (row) =>{
            const { id } = await prisma.focusArea.findFirst({
                where: {
                    name:{
                        equals: row["Recommendation Area"]
                    }
            
                }
            })
            await prisma.policies.create({
                data: {
                    description: row["Policy Description"],
                    focus_area_id: id,
                    policy_number: parseInt(row["Strategy Number"].split(".")[0], 10)
                }
            })
            count++;
        })
    )
    console.log(`created ${count} policy entries`);
    return true;
}

const addStrategies = async() => {
    let count = 0;
    await Promise.all(
        normalized_data.map(async (row) =>{
            const policy_lookup = await prisma.policies.findFirst({
                where: {
                    policy_number:{
                        equals: row["Policy Number"]
                    },
                    description: {
                        equals: row["Policy Description"]
                    },
                    area: {
                        name : {
                            equals: row["Recommendation Area"]
                        }
                    }
            
                },
                include: {
                    area: true,
                }
            })

            console.log({
                "POLICY LOOKUP":policy_lookup,
                "CSV ROW": row,
            });

            
            await prisma.strategy.create({
                data: {
                    content: row["Strategy"],
                    policy_id: policy_lookup.id,
                    strategy_number: row["Strategy Number"],
                    timeline_id: row["tl_id"],
                    status_id: 1,
                }
            });
            

            count++;
        })
    )
    console.log(`created ${count} policy entries`);
    return true;
}


/*
async function resetTables(){
    const resetTables = ['TimelineOption']
        .filter((name) => name !== '_prisma_migrations')
        .map((name) => `"public"."${name}"`)
        .join(', ')

    await prisma.$executeRawUnsafe(`TRUNCATE TABLE ${resetTables} RESTART IDENTITY CASCADE;`)
}
*/

const combineByUniqueNames = (arr1,arr2, key_to_check) => {
    return arr1.concat(
        arr2.filter(obj2 => !arr1.some(obj1 => obj1[key_to_check] === obj2[key_to_check]))
    );
}

const addImplementers = async() => {
    let baseArray = []

    const town_data_sources = [
        town_departments.map(o => ({...o, is_department:true})), 
        town_committees_boards.map(o => ({...o, is_board:true})), 
        school_orgs.map(o => ({...o, is_school:true})),
    ];

    for (const arr of town_data_sources) {
        baseArray = combineByUniqueNames(baseArray, arr, "name")
    }

    const implenterArrays = normalized_data.map(x => x.implementers);
    for (const arr of implenterArrays) {
        baseArray = combineByUniqueNames(baseArray, arr, "name")
    }


    const uniqueImplementers = baseArray
        .sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
        .map(({order_number, ...rest}) => {

            return {
                ...rest,
            }
        });

    console.log("COMBINED IMPLEMENTERS:", uniqueImplementers)

    const items = await prisma.implementer.createMany({
        data: uniqueImplementers
    })
    
    console.log(`created ${items} implementer entries`);
    return true;
}

const addImplementerStrategies = async() => {
    let count = 0;
    await Promise.all(
        normalized_data.map(async (row) =>{
            const implementers = row["implementers"];
            console.log('imps to lookup:', implementers)
            const {id:strategy_id} = await prisma.strategy.findUniqueOrThrow({
                where: {
                    content:{
                        equals: row["Strategy"]
                    },
                },
                select: {
                    id: true,
                }
            });

            await Promise.all(
                implementers.map(async(item) => {
                   
                    const {id:imp_id} = await prisma.implementer.findUniqueOrThrow({
                        where: {
                            name: {
                                equals: item.name
                            },
                        },
                        select: {
                            id: true,
                        }
                    });

                    try {
                        const imp_to_strat = await prisma.strategyImplementer.upsert({
                            where: {
                                implementer_id_strategy_id : {
                                    implementer_id: imp_id,
                                    strategy_id: strategy_id,
                                },
                            },
                            update: {
                                order_number: item["order_number"],
                            },
                            create: {
                                implementer_id: imp_id,
                                strategy_id: strategy_id,
                                order_number: item["order_number"],
                            },
                        });
                        console.log(imp_to_strat);
                    } catch(e) {
                        console.log(e)
                    }

                    

                    


                    return true;
                })
            );

            
            /*
            console.log({
                row,
                "STRAT_ID": strategy_id
            });
            */
            
            /*
            await prisma.strategy.create({
                data: {
                    content: row["Strategy"],
                    policy_id: policy_lookup.id,
                    strategy_number: row["Strategy Number"],
                    timeline_id: row["tl_id"],
                    status_id: 1,
                }
            });
            */
            

            count++;
        })
    )
    //console.log(`created ${count}  entries`);
    return true;
}

async function main() {
    //console.log(normalized_data);

    //const uniqueStatuses = normalized_data.filter((obj, index, self) =>
    //    index === self.findIndex((t) => t["Status"] === obj["Status"])
    //);

    //console.log(uniqueStatuses.map(x => x["Status"]));
    
    //await addTimelineEntries();
    //await addRoles();
    //await addStatusEntries();
    //await addFocusAreas()
    //await addPolicies()
    //await addStrategies()
    //await addImplementers();
    //await addImplementerStrategies();

    
    const adminUser = await prisma.user.findUnique({
        where: {
            email:"adams.timothy.d@gmail.com",
        },
    });

    const adminRole = await prisma.role.findUnique({
        where:{
            name: "Admin"
        }
    });

    await prisma.userRole.create({
        data:{
            user_id: adminUser.id,
            role_id: adminRole.id
        }
    });
  
}


main()
  .then(async () => {
    await prisma.$disconnect();
    writer.end('\n---EOF---');
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    writer.end(`\n${e}`);
    process.exit(1)
  })