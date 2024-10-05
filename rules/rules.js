import Rule from "./Rule";
import RuleWordle from "./RuleWordle/RuleWordle";
import RuleMorse from "./RuleMorse/RuleMorse";
import RuleTimeEmoji from "./RuleTimeEmoji/RuleTimeEmoji";
import RuleImages from "./RuleImages/RuleImages";
import RuleSum from "./RuleSum/RuleSum";
import RuleEarthquake from "./RuleEarthquake/RuleEarthquake";
import RuleRickroll from "./RuleRickroll/RuleRickroll";
import Rule3Idiots from "./Rule3Idiots/Rule3Idiots";
import RuleMarauders from "./RuleMarauders/RuleMarauders";


var rules = [
    new Rule(
        "Your password must be at least 6 characters.",
        (t) => t?.length >= 6
    ),

    new Rule( 
        "Your password must include an uppercase and a lowercase letter.",
        (t) => (/[A-Z]/.test(t) && /[a-z]/.test(t))
    ),
    new Rule(
        "Your password must include a special character.",
        (t) => /[\W_]/.test(t)
    ),    
    new Rule(
        "Your password must include a negative number.",
        (t) => /-(?!0)\d/.test(t)
    ),    

    new RuleSum(),

    new Rule( 
        "Your password must contain the value of pi up to first 5 decimal places.",
        (t) => /(?:3\.14159)/.test(t)
    ),    

    new Rule(
        "Your password must have as many vowels as consonants.",
        (t) => (t.match(/[aeiou]/ig) || []).length === (t.match(/[bcdfghjklmnpqrstvwxys]/ig) || []).length
    ),

    new Rule(
        "Your password must contain the first name of at least one CB founder.",
        (t) => /pooja|nishtha|gaurisha|abhigya/i.test(t)
    ),

    new Rule(
        "Your password must contain the number of projects mentioned on the CB website.",
        (t) => /35/.test(t)
    ),

    new RuleTimeEmoji(),

    new RuleWordle(),

    new RuleEarthquake(),

    new RuleMorse(),

    new Rule(
        "Your password must contain the name of a metro station 3 stations away from Kashmere Gate.",
        (t) => /new delhi|newdelhi|vishwavidyalaya|delhi gate|delhigate|welcome|pratap nagar|pratapnagar/i.test(t)
    ),

    new RuleRickroll(), 

    new Rule( 
        "Your password must contain what we wear on Wednesdays.",
        (t) => /pink/i.test(t)
    ),

    new Rule3Idiots(),

    new RuleImages(),

    new Rule( 
        "Your password must include what you experience when you miss out on joining Celestial Biscuit.",
        (t) => /fomo|fearofmissingout|fear of missing out/i.test(t)
    ),

    new RuleMarauders()
];

function sort_rules(a, b){
    if(a.correct == b.correct){
        return b.num - a.num;
    }
    else if(!a.correct && b.correct){
        return -1;
    }
    else{
        return 1;
    }
}

export default rules;
export {sort_rules};
