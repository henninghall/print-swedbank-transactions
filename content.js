const getFirstElementByClassName = (className) => document.getElementsByClassName(className)[0]
const getElementByClassNameWhenFound = async (className) => await queryUntilFound(() => getFirstElementByClassName(className))
const getElementByInnerTextWhenFound = async (innerText, className) => await queryUntilFound(() => getByInnerText(innerText, className))

const clickElementWhenExistByClassName = async (className) => {
    const element = await getElementByClassNameWhenFound(className)
    element.click()
}

const clickElementWhenExistByInnerText = async (className, innerText) => {
    const element = await getElementByInnerTextWhenFound(className, innerText)
    element.click()
}

function getByInnerText(searchText, className) {
    const elements = document.getElementsByClassName(className)
    if (elements.length) return [...elements].find(tag => tag.textContent.includes(searchText))
}

const queryUntilFound = (query) => new Promise((resolve, reject) => {

    const timeout = setTimeout(() => {
        clearInterval(interval)
        reject()
    }, 10000)

    const interval = setInterval(() => {
        const element = query()
        if (element) {
            clearInterval(interval);
            clearTimeout(timeout);
            resolve(element)
        }
    }, 100);
})

async function run() {
    try {
        await clickElementWhenExistByClassName("_show-more_btn")
        await clickElementWhenExistByClassName("swed-button _margins-sm-md swed-button--link")
        await clickElementWhenExistByClassName("account-table__row account-table__row--body _align-start-center _layout-row")
        await clickElementWhenExistByInnerText("Skriv", "swed-button swed-button--guiding")
    } catch (error) {
        console.error(error)
    }
}

run()
