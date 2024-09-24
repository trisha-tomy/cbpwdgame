import Rule from "../Rule";

export default class RuleRickroll extends Rule{
    constructor(){
        super("Your password must contain the name of this memorable moment from the link.");

        this.solution = "rickroll"; // The answer is "rickroll"
        
        this.renderItem = () => (
            <span>
                <a href="https://youtu.be/dQw4w9WgXcQ?si=CCeAzh3ucErpI3Iw" target="_blank">
                    Watch this memorable moment here
                </a>.
            </span>
        );
    }

    check(txt){
        let r = new RegExp(`(${this.solution})`, "i");
        return r.test(txt);
    }
}
