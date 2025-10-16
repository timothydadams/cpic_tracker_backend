export const town_departments = [
    {name:"Code Enforcement"},
    {name:"General Assistance"},
    {name:"Town Manager"},
    {name:"Town Planner"},
    {name:"Police Department"},
    {name:"Police Chief"},
    {name:"Fire Department"},
    {name:"Fire Chief"},
    {name:"Ambulance Service"},
    {name:"Ambulance Chief"},
    {name:"Public Library"},
    {name:"Public Works Department"},
    {name:"Public Works Director"},
    {name:"Town Clerk"},
    {name:"Transfer Station"},
];

export const town_committees_boards = [
    {name:"Board of Assessment Review"},
    {name:"Cemetery Committee"},
    {name:"Charter Commission"},
    {name:"Cobbossee Watershed Trustees"},
    {name:"Comprehensive Plan Implementation Committee"},
    {name:"Conservation Commission"},
    {name:"Downtown Revitalization Committee"},
    {name:"Finance Committee"},
    {name:"Planning Board"},
    {name:"Public Library Board of Trustees"},
    {name:"Recreation Committee"},
    {name:"Recreation Director"},
    {name:"Winthrop Area YMCA"},
    {name:"Town Council"},
    {name:"Winthrop Maine Historical Society"},
    {name:"Utilities District"},
    {name:"Zoning Board of Appeals"},
];

export const school_orgs = [
    {name:"School Superintendent"},
    {name:"School Board"},
    {name:"Winthrop Public Schools"},
];


const implementerKeys = [
    'Implementor 1',
    'Implementor 2',
    'Implementor 3',
    'Implementor 4',
    'Implementor 5',
    'Implementor 6',
]

const capitalizeWords = (sentence) => {
  return sentence.split(' ').map(word => {
    if (word.length === 0) { // Handle empty strings or multiple spaces
      return '';
    }
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(' ');
}

export const clean_rows = (data) => {
    return data.map(r => {
        const pol_num = parseInt(r["Strategy Number"].split(".")[0], 10)
        const strat_num = parseInt(r["Strategy Number"].split(".")[1], 10)
        r["Policy Number"] = pol_num;
        r["Strategy Number"] = strat_num;

        let temp = r["Timeline"].toLowerCase();

        if (temp.includes("short")) {
            r["Timeline"] = "Short-Term";
            r["tl_id"] = 2
        } else if (temp.includes("long")) {
            r["Timeline"] = "Long-Term";
            r["tl_id"] = 4
        } else if (temp.includes("mid")) {
            r["Timeline"] = "Mid-Term";
            r["tl_id"] = 3
        } else {
            r["Timeline"] = "Ongoing"
            r["tl_id"] = 1
        }

        const implementers = []

        for (const [idx, key] of implementerKeys.entries()){
            
            if (r[key] !== "") {
                if (r[key].toLowerCase() === "ceo") {
                    r[key] = "Code Enforcement Officer"
                }
                if (r[key].toLowerCase() === "assessor") {
                    r[key] = "Town Assessor"
                }
                if (r[key].toLowerCase() === "public works") {
                    r[key] = "Public Works Department"
                }
                
                if (r[key] === "Fire, Police & Ambulance chiefs") {
                    let len = implementerKeys.length;
                    implementers.push(
                        {
                            name: capitalizeWords("Fire Chief"),
                            order_number: idx + 1,
                        },
                        {
                            name: capitalizeWords("Police Chief"),
                            order_number: len + 1,
                        },
                        {
                            name: capitalizeWords("Ambulance Chief"),
                            order_number: len + 1,
                        },
                    )
                } else {
                    implementers.push({
                        name: capitalizeWords(r[key]),
                        order_number: idx + 1,
                    });
                }

                
            }
            
        }

        r["implementers"] = implementers

        return r
    })
}