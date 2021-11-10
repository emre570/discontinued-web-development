class Course{
    constructor(title,instructor){
    this.title = title;
    this.instructor = instructor;
    }
}

class UI{
    addCourseToList(course){
        const list = document.getElementById('course-list');
        var html =`
            <tr>
                <td>${course.title}</td>
                <td>${course.instructor}</td>
                <td><a href="#" class="btn btn-danger btn-sm delete">Delete</a></td>
            </tr>
        `;
    
        list.innerHTML += html;
    }

    clearControls(){
        const title = document.getElementById('title').value = "";
        const instructor = document.getElementById('instructor').value = "";
    }

    deleteCourse(element){
        if(element.classList.contains('delete'))
            element.parentElement.parentElement.remove();
    }
}

document.getElementById('new-course').addEventListener('submit',(event)=>{
    const title = document.getElementById('title').value;
    const instructor = document.getElementById('instructor').value;

    // Create course object
    const course = new Course(title, instructor);
    //console.log(course);

    // Create UI
    const ui = new UI();
    
    // Add course to the list
    ui.addCourseToList(course);

    // Clear controls
    ui.clearControls();

    //console.log(title, instructor);

    event.preventDefault();
});

document.getElementById('course-list').addEventListener('click', (event)=>{
    const ui = new UI();
    ui.deleteCourse(event.target);
})