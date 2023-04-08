import {makeProject} from '@motion-canvas/core';

import terminal from "./scenes/terminal?scene";
import logo from "./scenes/logo?scene";
import components from "./scenes/actionComponents?scene";
import solution from "./scenes/solution?scene";
import problem from "./scenes/problem?scene";
import problemMemes from "./scenes/problemMemes?scene";
import pipeline from "./scenes/pipeline?scene";

export default makeProject({
    scenes: [logo, problem, problemMemes, solution, pipeline, components]
});
