function removeTags(text) {
  return text
    .replaceAll("&#x0D;", "")
    .replaceAll("<b>", "")
    .replaceAll("</b>", "")
    .replaceAll("&lt;", "")
    .replaceAll("&gt;", "")
    .replaceAll("^", "/");
}
export default removeTags;
