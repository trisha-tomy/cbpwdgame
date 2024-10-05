import Rule from "../Rule";

export default class RuleRickroll extends Rule {
    constructor() {
        super("Within this ");

        this.solution = "rickroll";  // The correct answer is "rickroll"

        this.renderItem = () => (
            <span>
                <a href="https://bit.ly/cb-exp-24" target="_blank">link</a> lies a memorable experience. To proceed, your password must feature the name of that moment.
            </span>
        );
    }

    check(txt) {
        // Adjust the regex to allow "rickroll" or "rick roll" (with or without space)
        let r = new RegExp(`(rick\\s*roll)`, "i");
        return r.test(txt); 
    }
}
