const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const puppeteerExtra = require('puppeteer-extra');
const stealthPlugin = require('puppeteer-extra-plugin-stealth');

const rand_url = 'https://icp.administracionelectronica.gob.es/icpplus/index.html';

puppeteerExtra.use(stealthPlugin());

async function main() {
    while (true) {
        const browser = await puppeteerExtra.launch({
            headless: false,
        });

        const page = await browser.newPage();

        try {
            await page.goto(rand_url);

            const content = await page.content();
            const $ = cheerio.load(content);

            // Wait for the select element with ID 'form' to become available.
            await page.waitForSelector('#form', { timeout: 10000 });

            // Select the option by value.
            await page.select('#form', '/icpplus/citar?p=43&locale=es');
            console.log("Option selected successfully.");

            // Wait for 1 second before proceeding to the next action.
            await page.waitForTimeout(1000);

            // Wait for the "Aceptar" button to become available and then click it.
            await page.waitForSelector('#btnAceptar', { timeout: 5000 });
            await page.click('#btnAceptar');
            console.log("Aceptar button clicked successfully.");

            // Now, let's select the option with value="2" within the optgroup.
            await selectOptionWithValueTwo(page);
            console.log("Option with value='2' within optgroup selected successfully.");

            // Wait for 1 second before proceeding to the next action.
            await page.waitForTimeout(1000);

            // Now, let's select the option with value="4037".
            await selectOptionWithValue4037(page);
            console.log("Option with value='4037' selected successfully.");

            // Wait for 1 second before proceeding to the next action.
            await page.waitForTimeout(1000);

            // Click the "Aceptar" button.
            await page.waitForSelector('#btnAceptar', { timeout: 5000 });
            await page.click('#btnAceptar');
            console.log("Aceptar button clicked successfully.");

            // Wait for 1 second before proceeding to the next action.
            await page.waitForTimeout(1000);

            // After the website reloads, wait for the "Entrar" button to become available and then click it.
            await page.waitForSelector('input[type="button"].mf-button.primary#btnEntrar[value="Entrar"]', { timeout: 5000 });
            await page.click('input[type="button"].mf-button.primary#btnEntrar[value="Entrar"]');
            console.log("Entrar button clicked successfully.");

            // Wait for 1 second before proceeding to the next action.
            await page.waitForTimeout(1000);

            // Now, let's select the <label> with class "w50".
            await selectLabelWithClassW50(page);
            console.log("<label> with class 'w50' selected successfully.");

            // You can continue with further interactions as needed.

            // ... (remaining code)

        } catch (error) {
            console.error("An error occurred:", error);
        } finally {
            // Close the browser at the end of each iteration.
            await browser.close();
        }

        // Wait for 2 minutes before starting the next iteration.
        console.log("Waiting for 2 minutes before the next iteration...");
        for (let i = 120; i >= 0; i--) {
            process.stdout.write(`Time left: ${i} seconds   \r`);
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
        console.log(""); // Print a newline after the timer.
    }
}

// Define a function to select the option with value="2" within the optgroup.
async function selectOptionWithValueTwo(page) {
    try {
        // Wait for the select element with name "sede" to become available.
        await page.waitForSelector('select[name="sede"]', { timeout: 5000 });

        // Use evaluate to select the option with value="2" within the optgroup.
        await page.evaluate(() => {
            const selectElement = document.querySelector('select[name="sede"]');
            const optionToSelect = selectElement.querySelector('optgroup option[value="2"]');
            optionToSelect.selected = true;
            selectElement.dispatchEvent(new Event('change'));
        });
    } catch (error) {
        console.error("An error occurred during the selectOptionWithValueTwo function:", error);
    }
}

// Define a function to select the option with value="4037" once.
async function selectOptionWithValue4037(page) {
    try {
        // Wait for the select element with name "tramiteGrupo[0]" to become available.
        await page.waitForSelector('select[name="tramiteGrupo[0]"]', { timeout: 5000 });

        // Select the option by value.
        await page.select('select[name="tramiteGrupo[0]"]', '4037');
        console.log("Option with value='4037' selected successfully.");

        // Wait for 1 second before proceeding to the next action.
        await page.waitForTimeout(1000);
    } catch (error) {
        console.error("An error occurred during the selectOptionWithValue4037 function:", error);
    }
}

// Define a function to select the <label> with class "w50".
async function selectLabelWithClassW50(page) {
    try {
        await page.waitForSelector('label.w50[for="rdbTipoDocDni"]', { timeout: 5000 });
        await page.click('label.w50[for="rdbTipoDocDni"]');
    } catch (error) {
        console.error("An error occurred during the selectLabelWithClassW50 function:", error);
    }

    // ...

    // After selecting the <label> with class "w50", let's add text to the input element.
    await addTextToInput(page);
    console.log("Text added to input successfully.");

    // ...

    // Define a function to add text to the input element.
    async function addTextToInput(page) {
        try {
            await page.waitForSelector('input#txtIdCitado.cajapeque', { timeout: 5000 });
            await page.type('input#txtIdCitado.cajapeque', '46411287R');
        } catch (error) {
            console.error("An error occurred during the addTextToInput function:", error);
        }
    }

    // ...

    // After adding text to the first input, let's add text to the second input.
    await addTextToSecondInput(page);
    console.log("Text added to the second input successfully.");

    // ...

    // Define a function to add text to the second input element with specific type and class.
    async function addTextToSecondInput(page) {
        try {
            await page.waitForSelector('input[type="text"].mf-input__m#txtDesCitado', { timeout: 5000 });
            await page.type('input[type="text"].mf-input__m#txtDesCitado', 'ISMAEL SALHA KULAB');
        } catch (error) {
            console.error("An error occurred during the addTextToSecondInput function:", error);
        }
    }

    // After adding text to the second input, press the "Aceptar" button again.
    await page.waitForSelector('#btnEnviar', { timeout: 5000 });
    await page.click('#btnEnviar');
    console.log("Aceptar button clicked successfully.");

    // Wait for 1 second before proceeding to the next action.
    await page.waitForTimeout(1000);
}

// Run the main function initially
main();
