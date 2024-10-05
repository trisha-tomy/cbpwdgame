import Rule from "../Rule";

const wordleLinks = [
    { url: "https://mywordle.strivemath.com/?word=euuwfa", solution: "igdtuw" },
    { url: "https://mywordle.strivemath.com/?word=cocdic", solution: "galaxy" },
    { url: "https://mywordle.strivemath.com/?word=ycjpzw", solution: "cosmos" },
    { url: "https://mywordle.strivemath.com/?word=ycdhew", solution: "comets" },
    { url: "https://mywordle.strivemath.com/?word=wiirce", solution: "aurora" },
    { url: "https://mywordle.strivemath.com/?word=iskhzv", solution: "meteor" },
    { url: "https://mywordle.strivemath.com/?word=lzrvxe", solution: "plasma" },
    { url: "https://mywordle.strivemath.com/?word=lzrqpx", solution: "planet" },
    { url: "https://mywordle.strivemath.com/?word=lvfwzr", solution: "photon" }
];

function get_random_wordle(){
    const randomIndex = Math.floor(Math.random() * wordleLinks.length);
    return wordleLinks[randomIndex];
}

export default class RuleWordle extends Rule{
    constructor(){
        super("Your password must contain the answer to ");
        
        let selectedWordle = get_random_wordle();
        this.solution = selectedWordle.solution;
        
        this.renderItem = () => <span><a href={selectedWordle.url} target="_blank">this Wordle </a> (Hint: think CB and IGDTUW ;))</span>;
    }

    check(txt){
        let r = new RegExp(`(${this.solution})`, "i");
        return r.test(txt); 
    }
}
