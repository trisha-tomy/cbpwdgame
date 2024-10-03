import Rule from "../Rule";

export default class RuleMarauders extends Rule {
    constructor() {
        super("Your password must include the phrase to close this map.");

        this.imageUrl = "/maraudersmap.webp"; 
        this.solution = ["mischiefmanaged", "mischief managed"]; 
        
        this.renderItem = () => (
            <span>
                <img src={this.imageUrl} alt="mischief managed" style={{ height: "200px" }} />
            </span>
        );
    }

    check(txt) {
        // Check if any solution word is found in the text, ignoring case
        return this.solution.some(answer => new RegExp(answer, "i").test(txt));
    }
}
