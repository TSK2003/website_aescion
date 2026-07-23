"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSolutionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_solution_dto_1 = require("./create-solution.dto");
class UpdateSolutionDto extends (0, swagger_1.PartialType)(create_solution_dto_1.CreateSolutionDto) {
}
exports.UpdateSolutionDto = UpdateSolutionDto;
//# sourceMappingURL=update-solution.dto.js.map