import router from '../router.js';
import service from '../service.js';
import store from "../store.js";

export default {
    getTitle: function() {
        return 'Select Chat Subject';
    },
    render: function() {
        console.log('Render home component');
        let $view = $($('#tpl-home').html());
        let $select = $('#selectSubject', $view);

        getAndRenderSubjects($select);

        $select.change(event => {
            let subject = $select.val();
            if (subject == '') return;
            store.setSubject(subject);
            router.navigate('/chat')
        });

        let $newSubject = $('#subjectName', $view);
        let $createSubject = $('#createSubject', $view);
        $createSubject.click(event => {
            event.preventDefault();
            if (!document.querySelector('form').reportValidity()) return;
            store.setSubject($newSubject.val());
            router.navigate('/chat');
        });

        return $view;
    }
};

function getAndRenderSubjects($select) {
    service.getSubjects()
        .then(subjects => {
            $select.empty();
            $select.append($('<option>').text("Select subject"));
            for (let subject of subjects) {
                let $option = $('<option>').text(subject);
                $select.append($option);
            }
        })
        .catch(xhr => $('footer').text('Unexpected error (' + xhr.status + ')'));
}
