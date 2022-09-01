// 文件下载解决方案
//  如果支持微软的文件下载方式(ie10+浏览器)
if (window.navigator.msSaveBlob) {
  try {
    const blobObject = new Blob([res.data]);
    window.navigator.msSaveBlob(blobObject, fileName + suffix);
  } catch (e) {
    console.log(e);
  }
} else {
  //  其他浏览器
  let url = window.URL.createObjectURL(res.data);
  let link = document.createElement("a");
  link.style.display = "none";
  link.href = url;
  link.setAttribute("download", fileName + suffix);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(link.href);
}
