import Rule from "../Rule";

const imagePuzzles = [
    { imageUrl: "/nescafe.png", solution: ["nescafe"], question: "Your password must include the name of the eatery closest to this location." },
    { imageUrl: "/kaveri.png", solution: ["kaveri"], question: "Your password must include the name of this hostel." },
    { imageUrl: "/arch.png", solution: ["barch", "arch", "architecture"], question: "Your password must include the name of the department closest to this location." },
    { imageUrl: "/cse.png", solution: ["cse", "ece"], question: "Your password must include the name of this department." },
    { imageUrl: "/gcr.png", solution: ["gcr"], question: "Your password must include the name of this doggo’s restplace." },
];

function get_random_image_puzzle() {
    const randomIndex = Math.floor(Math.random() * imagePuzzles.length);
    return imagePuzzles[randomIndex];
}

export default class RuleImagePuzzle extends Rule {
    constructor() {
        super("Your password must contain the solution to the image puzzle.");

        let selectedPuzzle = get_random_image_puzzle();
        this.solution = selectedPuzzle.solution;  
        this.question = selectedPuzzle.question;  
        
        this.renderItem = () => (
            <span>
                <img src={selectedPuzzle.imageUrl} alt="Image Puzzle" style={{ width: "200px", height: "200px" }} />
                <p>{this.question}</p>
            </span>
        );
    }

    check(txt) {
        // Check if any solution word is found in the text, ignoring case
        return this.solution.some(answer => new RegExp(answer, "i").test(txt));
    }
}
