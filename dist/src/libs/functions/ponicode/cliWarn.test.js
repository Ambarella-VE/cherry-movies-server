import * as cliWarn from "libs/functions/cliWarn";
// @ponicode
describe("cliWarn.default", () => {
    test("0", () => {
        let result = cliWarn.default("An error occurred processing your request.");
        expect(result).toMatchSnapshot();
    });
    test("1", () => {
        let result = cliWarn.default("This is an exception, voilà");
        expect(result).toMatchSnapshot();
    });
    test("2", () => {
        let result = cliWarn.default("No error");
        expect(result).toMatchSnapshot();
    });
    test("3", () => {
        let result = cliWarn.default("Error:");
        expect(result).toMatchSnapshot();
    });
    test("4", () => {
        let result = cliWarn.default("cannot be found.");
        expect(result).toMatchSnapshot();
    });
    test("5", () => {
        let result = cliWarn.default("");
        expect(result).toMatchSnapshot();
    });
    test("6", () => {
        let result = cliWarn.default("The line-by-line profiler can only be used in dev.");
        expect(result).toMatchSnapshot();
    });
    test("7", () => {
        let result = cliWarn.default("Top level object in 'override.yml' needs to be an object");
        expect(result).toMatchSnapshot();
    });
    test("8", () => {
        let result = cliWarn.default("Exception not raised: %s");
        expect(result).toMatchSnapshot();
    });
    test("9", () => {
        let result = cliWarn.default("Invalid Invitation Token.");
        expect(result).toMatchSnapshot();
    });
    test("10", () => {
        let result = cliWarn.default("Sorry, This video cannot be accessed via this website");
        expect(result).toMatchSnapshot();
    });
});
//# sourceMappingURL=cliWarn.test.js.map