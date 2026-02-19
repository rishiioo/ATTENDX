const logoutBtn = document.querySelector(".logout-btn");  

logoutBtn.addEventListener("click",  () =>{
    
    window.location.href = "index.html";
});
const subjectDropdown = document.getElementById("subject");  
const subjectSpan = document.getElementById("selected-subject");       

subjectDropdown.addEventListener("change", function() {
    const selectedText = subjectDropdown.options[subjectDropdown.selectedIndex].text;  
    
    subjectSpan.textContent = selectedText;
    
  const table = document.querySelector(".attendance-details table")
  if(subjectDropdown.value === "") {
        table.style.display = "none"; 
    } else {
        table.style.display = "table"; 
    }
});