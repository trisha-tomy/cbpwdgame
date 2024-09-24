import Rule from "../Rule";

export default class RuleRickroll extends Rule {
    constructor() {
        super("Within this ");

        this.solution = "rickroll";  // The correct answer is "rickroll"

        // Make the word 'link' clickable and redirect to the Rickroll video
        this.renderItem = () => (
            <span>
                <a href="https://bit.ly/cb-exp-24" target="_blank">link</a> lies a memorable experience. To proceed, your password must feature the name of that moment.
            </span>
        );
    }

    check(txt) {
        let r = new RegExp(`(${this.solution})`, "i");
        return r.test(txt); 
    }
}
