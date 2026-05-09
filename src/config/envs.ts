import 'dotenv/config';
import * as Joi from 'joi';

interface EnvVasrs {
    PORT: number;
}

const envsSchema = Joi.object<EnvVasrs>({
    PORT: Joi.number().required(),
})  
.unknown(true);

const { error, value } = envsSchema.validate( process.env );

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const envVasrs: EnvVasrs = value;

export const envs = {
    port : envVasrs.PORT,   
};