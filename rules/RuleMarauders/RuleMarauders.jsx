import Rule from "../Rule";

export default class RuleMarauders extends Rule {
    constructor() {
        super("Your password must include the phrase to close this map.");

        this.imageUrl = "/maraudersmap.webp"; 
        this.solution = ["mischiefmanaged"]; 
        
        this.renderItem = () => (
            <span>
                <img src={this.imageUrl} alt="mischief managed" style={{ height: "200px" }} />
            </span>
        );
    }

    check(txt) {
        return this.solution.some(answer => new RegExp(`\\b${answer}\\b`, "i").test(txt));
    }
}
