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

            await page.waitForSelector('#form', { timeout: 10000 });

            await page.select('#form', '/icpplus/citar?p=43&locale=es');
            console.log("Option selected successfully.");

            await page.waitForTimeout(1000);

            await page.waitForSelector('#btnAceptar', { timeout: 5000 });
            await page.click('#btnAceptar');
            console.log("Aceptar button clicked successfully.");

            await selectOptionWithValueTwo(page);
            console.log("Option with value='2' within optgroup selected successfully.");

            await page.waitForTimeout(1000);

            await selectOptionWithValue4037(page);
            console.log("Option with value='4037' selected successfully.");

            await page.waitForTimeout(1000);

            await page.waitForSelector('#btnAceptar', { timeout: 5000 });
            await page.click('#btnAceptar');
            console.log("Aceptar button clicked successfully.");

            await page.waitForTimeout(1000);

            await page.waitForSelector('input[type="button"].mf-button.primary#btnEntrar[value="Entrar"]', { timeout: 5000 });
            await page.click('input[type="button"].mf-button.primary#btnEntrar[value="Entrar"]');
            console.log("Entrar button clicked successfully.");

            await page.waitForTimeout(1000);

            await selectLabelWithClassW50(page);
            console.log("<label> with class 'w50' selected successfully.");

        } catch (error) {
            console.error("An error occurred:", error);
        } finally {
            await browser.close();
        }

        console.log("Waiting for 2 minutes before the next iteration...");
        for (let i = 120; i >= 0; i--) {
            process.stdout.write(`Time left: ${i} seconds   \r`);
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
        console.log("");
    }
}

async function selectOptionWithValueTwo(page) {
    try {
        await page.waitForSelector('select[name="sede"]', { timeout: 5000 });
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

async function selectOptionWithValue4037(page) {
    try {
        await page.waitForSelector('select[name="tramiteGrupo[0]"]', { timeout: 5000 });
        await page.select('select[name="tramiteGrupo[0]"]', '4037');
        console.log("Option with value='4037' selected successfully.");
        await page.waitForTimeout(1000);
    } catch (error) {
        console.error("An error occurred during the selectOptionWithValue4037 function:", error);
    }
}

async function selectLabelWithClassW50(page) {
    try {
        await page.waitForSelector('label.w50[for="rdbTipoDocDni"]', { timeout: 5000 });
        await page.click('label.w50[for="rdbTipoDocDni"]');
    } catch (error) {
        console.error("An error occurred during the selectLabelWithClassW50 function:", error);
    }

    await addTextToInput(page);
    console.log("Text added to input successfully.");

    await addTextToSecondInput(page);
    console.log("Text added to the second input successfully.");

    await page.waitForSelector('#btnEnviar', { timeout: 5000 });
    await page.click('#btnEnviar');
    console.log("Aceptar button clicked successfully.");

    await page.waitForTimeout(1000);
}

async function addTextToInput(page) {
    try {
        await page.waitForSelector('input#txtIdCitado.cajapeque', { timeout: 5000 });
        await page.type('input#txtIdCitado.cajapeque', '46411287R');
    } catch (error) {
        console.error("An error occurred during the addTextToInput function:", error);
    }
}

async function addTextToSecondInput(page) {
    try {
        await page.waitForSelector('input[type="text"].mf-input__m#txtDesCitado', { timeout: 5000 });
        await page.type('input[type="text"].mf-input__m#txtDesCitado', 'ISMAEL SALHA KULAB');
    } catch (error) {
        console.error("An error occurred during the addTextToSecondInput function:", error);
    }
}

main();
