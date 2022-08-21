'use strict';

window.onload = function () {
    function createToDo(text) {
        let date = new Date(),
            id = date.getFullYear().toString() + date.getMonth().toString() + date.getDate().toString() +
                date.getHours().toString() + date.getMinutes().toString() + date.getSeconds().toString() +
                date.getMilliseconds().toString(),
            toDoText = text,
            toDo = createContainer(),
            inputContainer = document.createElement('div'),
            input = document.createElement('input'),
            buttons = document.createElement('div'),
            actionBtn = document.createElement('button'),
            cancelBtn = document.createElement('button'),
            deleteBtn = document.createElement('button');

        function createContainer() {
            let toDo = document.createElement('div');
    
            toDo.classList.add('row');
            toDo.classList.add('g-3');
            toDo.classList.add('align-items-center');
            toDo.classList.add('mb-2');
    
            return toDo;
        }

        inputContainer.classList.add('col-auto');
        input.style.display = 'inline-block';
        input.classList.add('form-control');
        input.value = text;
        input.setAttribute('readonly', true);

        buttons.classList.add('col-auto');

        let icon = document.createElement('i');
        icon.classList.add('fa-solid');
        icon.classList.add('fa-pencil');
        actionBtn.append(icon);
        let actionText = document.createTextNode(' Edit');
        actionBtn.append(actionText);
        actionBtn.classList.add('btn');
        actionBtn.classList.add('btn-primary');
        actionBtn.classList.add('me-2');

        icon = document.createElement('i');
        icon.classList.add('fa-solid');
        icon.classList.add('fa-xmark');
        cancelBtn.append(icon);
        let cancelText = document.createTextNode(' Cancel');
        cancelBtn.append(cancelText);
        cancelBtn.disabled = true;
        cancelBtn.classList.add('btn');
        cancelBtn.classList.add('btn-light');
        cancelBtn.classList.add('me-2');

        icon = document.createElement('i');
        icon.classList.add('fa-solid');
        icon.classList.add('fa-trash');
        deleteBtn.append(icon);
        let deleteText = document.createTextNode(' Delete');
        deleteBtn.append(deleteText);
        deleteBtn.classList.add('btn');
        deleteBtn.classList.add('btn-light');

        inputContainer.appendChild(input);
        buttons.appendChild(actionBtn);
        buttons.appendChild(cancelBtn);
        buttons.appendChild(deleteBtn);

        toDo.appendChild(inputContainer);
        toDo.appendChild(buttons);

        actionBtn.addEventListener('click', function (e) {
            if (actionText.textContent === ' Edit') {
                beginEdit();
            } else {
                endEdit();
            }
        });

        cancelBtn.addEventListener('click', function (e) {
            cancelEdit();
        });

        deleteBtn.addEventListener('click', function (e) {
            deleteToDo();
        });

        function beginEdit() {
            input.removeAttribute('readonly');
            actionText.textContent = ' Apply';
            cancelBtn.disabled = false;
        }

        function cancelEdit() {
            input.value = toDoText;
            input.setAttribute('readonly', true);
            actionText.textContent = ' Edit';
            cancelBtn.disabled = true;
        }

        function endEdit() {
            toDoText = input.value;
            input.setAttribute('readonly', true);
            actionText.textContent = ' Edit';
            cancelBtn.disabled = true;
        }

        function deleteToDo() {
            toDo.parentNode.removeChild(toDo);
        }

        return toDo;
    }

    document.getElementById('add-btn').addEventListener('click', function (e) {
        document.querySelector('.container').appendChild(createToDo(''));
    });
}