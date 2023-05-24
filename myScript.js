import fs from "fs";

const readListOfVMsFromFile = (directory) => {
  const files = fs.readdirSync(directory);
  return files.reduce((all, filename) => {
    const path = `${directory}/${filename}`;
    console.log(files, path);
    return `${all}\n${fs.readFileSync(path, "utf-8")}`;
  }, "");
};

const transformVMsToArray = (single_vm) => {
  const vmName = single_vm
    .split("\n")
    .map((word) => word.toLocaleLowerCase().trim())
    .filter((word) => word.length > 0);
  return vmName;
};

const readFile = readListOfVMsFromFile("vm_list");
const arrayOfVMs = transformVMsToArray(readFile);

console.log(arrayOfVMs);
console.log(arrayOfVMs.length);

const transferToArrayOfObjects = arrayOfVMs.map((value) => {
  return {
    vmName: value,
    root: null,
    var_log: null,
    opt: null,
    home: null,
    totalRAM: null,
    totalCPU: null,
  };
});

console.log(transferToArrayOfObjects);

fs.writeFile(
  "./vm_list/results.json",
  JSON.stringify(transferToArrayOfObjects),
  (error) => {
    if (error) throw error;
    console.log("Write completed successfully");
  }
);
