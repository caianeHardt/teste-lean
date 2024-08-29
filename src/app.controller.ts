import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@Controller()
@ApiTags('Application')
export class AppController {

@Get('/status')
getStatus() {
    return {
        label: 'Lean StartUp Fintech API',
    }
}
}