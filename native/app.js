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
            inputLabel = document.createElement('label'),
            buttons = document.createElement('div'),
            actionBtn = createActionBtn(),
            cancelBtn = document.createElement('button'),
            deleteBtn = document.createElement('button');

        /**
         * Creates a to-do container.
         * @returns {HTMLDivElement} A HTMLDivElement object as a to-do container.
         */
        function createContainer() {
            let toDo = document.createElement('div');
            toDo.classList.add('row');

            return toDo;
        }

        /**
         * Creates an edit / apply action button.
         * @returns {HTMLButtonElement} A HTMLButtonElement object as an edit / apply action button.
         */
        function createActionBtn() {
            let actionBtn = document.createElement('button');

            let icon = document.createElement('i');
            icon.classList.add('material-icons');
            icon.classList.add('left');
            icon.appendChild(document.createTextNode('create'));

            actionBtn.append(icon);
            let actionText = document.createTextNode(' Edit');
            actionBtn.append(actionText);
            actionBtn.style.marginRight = "5px";
            actionBtn.classList.add('waves-effect');
            actionBtn.classList.add('waves-light');
            actionBtn.classList.add('btn');
            actionBtn.classList.add('blue');
            actionBtn.addEventListener('click', function (e) {
                if (actionText.textContent === ' Edit') {
                    beginEdit();
                } else {
                    endEdit();
                }
            });

            return actionBtn;
        }

        inputContainer.classList.add('input-field');
        inputContainer.classList.add('col');
        inputContainer.classList.add('m5');
        inputContainer.classList.add('s12');

        input.id = id;
        input.type = 'text';
        input.value = text;
        input.disabled = true;

        inputLabel.setAttribute('for', id);
        inputLabel.appendChild(document.createTextNode('Task Name'));

        inputContainer.appendChild(input);
        inputContainer.appendChild(inputLabel);

        buttons.classList.add('col');
        buttons.classList.add('m7');
        buttons.classList.add('s12');
        buttons.style.marginTop = '24px';

        let icon = document.createElement('i');
        icon.classList.add('material-icons');
        icon.classList.add('left');
        icon.appendChild(document.createTextNode('clear'));
        cancelBtn.append(icon);
        let cancelText = document.createTextNode(' Cancel');
        cancelBtn.append(cancelText);
        cancelBtn.disabled = true;
        cancelBtn.style.marginRight = "5px";
        cancelBtn.classList.add('waves-effect');
        cancelBtn.classList.add('btn-flat');

        icon = document.createElement('i');
        icon.classList.add('material-icons');
        icon.classList.add('left');
        icon.appendChild(document.createTextNode('delete'));
        deleteBtn.append(icon);
        let deleteText = document.createTextNode(' Delete');
        deleteBtn.append(deleteText);
        deleteBtn.classList.add('waves-effect');
        deleteBtn.classList.add('waves-red');
        deleteBtn.classList.add('btn-flat');

        buttons.appendChild(actionBtn);
        buttons.appendChild(cancelBtn);
        buttons.appendChild(deleteBtn);

        toDo.appendChild(inputContainer);
        toDo.appendChild(buttons);

        cancelBtn.addEventListener('click', function (e) {
            cancelEdit();
        });

        deleteBtn.addEventListener('click', function (e) {
            deleteToDo();
        });

        /**
         * Changes button text.
         * @param {HTMLButtonElement} button The button whose text to be changed.
         * @param {String} text The new text for the button.
         */
        function changeBtnText(button, text) {
            var textNode =  [...button.childNodes]
                .filter(function (node) { return node.nodeType === 3; })[0];
            
            textNode.textContent = text;
        }

        function beginEdit() {
            input.disabled = false;
            actionBtn.querySelector('i').textContent = 'check';
            changeBtnText(actionBtn, ' Apply');
            cancelBtn.disabled = false;
        }

        function cancelEdit() {
            input.value = toDoText;
            input.disabled = true;
            actionBtn.querySelector('i').textContent = 'create';
            changeBtnText(actionBtn, ' Edit');
            cancelBtn.disabled = true;
            M.toast({ html: 'Change canceled' });
        }

        function endEdit() {
            toDoText = input.value;
            input.disabled = true;
            actionBtn.querySelector('i').textContent = 'create';
            changeBtnText(actionBtn, ' Edit');
            cancelBtn.disabled = true;
            M.toast({ html: 'Change applied' });
        }

        function deleteToDo() {
            toDo.parentNode.removeChild(toDo);
            M.toast({ html: 'To-do deleted' });
        }

        return toDo;
    }

    document.getElementById('add-btn').addEventListener('click', function (e) {
        document.querySelector('.container').appendChild(createToDo(''));
    });
}