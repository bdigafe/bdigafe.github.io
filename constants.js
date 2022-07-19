const EthnicInfo = [
    { 'order' : 0, 'label': "All", "adm_rate_field": "UGDS", "population" : 1},
    { 'order' : 1, 'label': "White", "adm_rate_field": "UGDS_WHITE", "population" : 0.593 },
    { 'order' : 2, 'label': "Black", "adm_rate_field": "UGDS_BLACK" , "population" : 0.136 },
    { 'order' : 3, 'label': "Hispano", "adm_rate_field": "UGDS_HISP" , "population" : 0.189},
    { 'order' : 4, 'label': "Assian", "adm_rate_field": "UGDS_ASIAN" , "population" : 0.061 },
    { 'order' : 5, 'label': "American Indian", "adm_rate_field": "UGDS_AIAN" , "population" : 0.016 },
    { 'order' : 6, 'label': "Non-Hispanic", "adm_rate_field": "UGDS_NHPI" , "population" : 0 },
    { 'order' : 7, 'label': "Multi-race", "adm_rate_field": "UGDS_2MOR" , "population" :  0.029},
    { 'order' : 8, 'label': "No race", "adm_rate_field": "UGDS_NRA" , "population" : 0 },
    { 'order' : 9, 'label': "Unknown", "adm_rate_field": "UGDS_UNKN" , "population" : 0 }
];

const GenderInfo = [
    { 'order' : 0, 'label': "All", "adm_rate_field": "UGDS", "population" : 1},
    { 'order' : 1, 'label': "Male", "adm_rate_field": "UGDS_MEN", "population" : 0.495 },
    { 'order' : 2, 'label': "Female", "adm_rate_field": "UGDS_WOMEN" , "population" : 0.505}
];

const EthnicIds = {
    "all"           : 0,
    "white"         : 1,
    "black"	        : 2,
    "hispano"       : 3,
    "assian"        : 4,
    "native"        : 5,
    "non_hispano"   : 6,
    "multi"         : 7,
    "no_race"       : 8,
    "unknown"       : 9
};


const EthnicNames = [
    "All",
    "White",
    "Black",
    "Hispano",
    "Assian",
    "American Indian",
    "Non-Hispanic",
    "Multi-race",
    "No race",
    "Unknown"
];

const ADM_RATE_ETHNIC = [
    "UGDS",
    "UGDS_WHITE",
    "UGDS_BLACK",
    "UGDS_HISP",
    "UGDS_ASIAN",
    "UGDS_AIAN",
    "UGDS_AIAN",
    "UGDS_NHPI",
    "UGDS_2MOR",
    "UGDS_NRA",
    "UGDS_UNKN"
];

const GenderIds = {
    "All" : 0,
    "Male": 1,
    "Female" : 2
}

const GENDER_NAMES = [
    "All",
    "Male",
    "Female"
];

const ADM_RATE_GENDER = [
    "UGDS",
    "UGDS_MEN",
    "UGDS_WOMEN"
];

const EthnicPopSize = [
    100,
    59.3,
    13.6,
    18.9,
    6.1,
    1.6,
    0.0,
    2.9
];

const US_States= [
    "",
    "AL",
    "AK",
    "AZ",
    "AR",
    "CA",
    "CO",
    "CT",
    "DE",
    "FL",
    "GA",
    "HI",
    "ID",
    "IL",
    "IN",
    "IA",
    "KS",
    "KY",
    "LA",
    "ME",
    "MD",
    "MA",
    "MI",
    "MN",
    "MS",
    "MO",
    "MT",
    "NE",
    "NV",
    "NH",
    "NJ",
    "NM",
    "NY",
    "NC",
    "ND",
    "OH",
    "OK",
    "OR",
    "PA",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VT",
    "VA",
    "WA",
    "WV",
    "WI",
    "WY"
];

const SAT_SCORE_MIN = 700;
const SAT_SCORE_MAX = 1600;
const SAT_SCORE_STEP = 100;
    