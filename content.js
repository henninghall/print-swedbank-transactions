const getFirstElementByClassName = className =>
  document.getElementsByClassName(className)[0];
const getElementByClassNameWhenFound = async className =>
  await queryUntilFound(() => getFirstElementByClassName(className));
const getElementByInnerTextWhenFound = async (innerText, className) =>
  await queryUntilFound(() => getByInnerText(innerText, className));

const clickElementWhenExistByClassName = async className => {
  const element = await getElementByClassNameWhenFound(className);
  element.click();
};

const clickElementWhenExistByInnerText = async (className, innerText) => {
  const element = await getElementByInnerTextWhenFound(className, innerText);
  element.click();
};

function getByInnerText(searchText, className) {
  const elements = document.getElementsByClassName(className);
  if (elements.length)
    return [...elements].find(tag => tag.textContent.includes(searchText));
}

const queryUntilFound = query =>
  new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      clearInterval(interval);
      clearTimeout(timeout);
      reject();
    }, 10000);

    const interval = setInterval(() => {
      const element = query();
      if (element) {
        clearInterval(interval);
        clearTimeout(timeout);
        resolve(element);
      }
    }, 100);
  });

let lastDate, fileName;
const setFileName = dateTd => {
  const date = dateTd.textContent.trim();
  const extension =
    lastDate === date
      ? "-" + ++numberOfSameDates
      : ((numberOfSameDates = 0), "");
  const fileName = date + extension;
  lastDate = date;
  document.title = fileName;
  console.log(fileName);
};

const getTrs = async () => {
  const table = await queryUntilFound(() =>
    getFirstElementByClassName("account-table__table")
  );
  const trs = table.getElementsByTagName("tr");
  const trElements = [...trs]
    .filter(tr => tr.getElementsByTagName("td").length)
    .slice(0, NUMBER_OF_FILES);
  return trElements;
};

const navigateToTable = async () => {
  await clickElementWhenExistByClassName("_show-more_btn");
  await clickElementWhenExistByClassName(
    "swed-button _margins-sm-md swed-button--link"
  );
  window.scrollTo(0, document.body.scrollHeight);
};

async function run() {
  // await navigateToTable()
  // const trElements = await getTrs()

  const trElements = document.querySelectorAll(
    "tr.ui-table__row.ui-table__row--linked.ui-table__row--body"
  );

  console.log(trElements);

  for (tr of trElements) {
    tr.click();
    // const dateTd = tr.getElementsByTagName('td')[2]
    // if (!dateTd) continue;
    // setFileName(dateTd)
    // dateTd.click()
    await clickElementWhenExistByInnerText(
      "Skriv",
      "swed-button swed-button--guiding"
    );
    await clickElementWhenExistByClassName(
      "swed-button _flex-noshrink _hide-print _paddings-x-lg swed-button--icon"
    );
  }
}

run();

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
