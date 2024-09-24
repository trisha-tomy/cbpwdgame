import Rule from "../Rule";

export default class Rule3Idiots extends Rule {
    constructor() {
        super("Your password must include one of the words written on this board");

        this.imageUrl = "/3idiots.jpeg"; 
        this.solution = ["prerajulisation", "farhanitrate"]; 
        
        this.renderItem = () => (
            <span>
                <img src={this.imageUrl} alt="prerajulisation, farhanitrate" style={{ height: "200px" }} />
            </span>
        );
    }

    check(txt) {
        return this.solution.some(answer => new RegExp(`\\b${answer}\\b`, "i").test(txt));
    }
}
