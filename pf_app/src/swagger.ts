import swaggerJSDoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"

// Options for the swagger docs
const options: swaggerJSDoc.Options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "PayFlow API",
			version: "1.0.0",
			description: "PayFlow API",
		},
	},
	apis: ["./src/**/*.ts"],
}

// Documentation in JSON format
const swaggerSpec = swaggerJSDoc(options)

// Function to setup and return swagger-ui-express middleware
const swaggerUiOptions = {
	customCss: ".swagger-ui .topbar { display: none }",
	customSiteTitle: "PayFlow | API",
	customfavIcon: "/favicon.svg",
}

// Sets up and returns the swagger-ui-express middleware
export const swaggerDocs = (app: any) => {
	app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions))
}

export default swaggerDocs