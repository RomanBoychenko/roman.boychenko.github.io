$(document).ready(function() {

    //NAV_PAGE
	$('#page-nav').onePageNav({
		currentClass: 'active',
		changeHash: false,
		scrollSpeed: 750,
		scrollThreshold: 0.5,
		filter: '',
		easing: 'swing',
		begin: function() {},
		end: function() {},
		scrollChange: function($currentListItem) {}
	});


    // MixItUp - фильтрация работ в портфолио
	$('#portfolio-projects').mixItUp();
	
    // fake-placeholder
    var formRows = document.querySelectorAll('.form-row');
    var formRowsInputs = document.querySelectorAll('.form-row__input')
    
    for(let i = 0; i < formRows.length; i++) {
        formRows[i].addEventListener('click', function () {

            var placeholderElements = this.querySelector('.fake-placeholder');
            placeholderElements.classList.add('active');
        })
    }
    
    for(let i = 0; i < formRowsInputs.length; i++) {
    
        formRowsInputs[i].addEventListener('blur', function () {
            var thisParent = this.parentElement;
    
            if (this.value == '') {
                thisParent.querySelector('span').classList.remove('active');
            }
        })
	}
	

    // form-validate
	$('#form').validate({
		rules: {
			email: {
				required: true,
				email: true
			},
			theme: {
				required: true
			},
			message: {
				required: true
			}
		},
		messages: {
			email: {
				required: 'Введите Ваш Email',
				email: 'Отсутствует символ @'
			},
			theme: {
				required: 'Введите тему сообщения'
			},
			message: {
				required: 'Введите текст сообщения'
			}
		},

		submitHandler: function (form) {
			ajaxFormSubmit();
		}
	});

	// Функция AJAX запрса на сервер
	function ajaxFormSubmit() {
		var string = $("#form").serialize(); // Соханяем данные введенные в форму в строку. 

		// Формируем ajax запрос
		$.ajax({
			type: "POST", // Тип запроса - POST
			url: "php/mail.php", // Куда отправляем запрос
			data: string, // Какие даные отправляем, в данном случае отправляем переменную string

			// Функция если все прошло успешно
			success: function (html) {
				$("#form").slideUp(800);
				$('#answer').html(html);
			}
		});

		// Чтобы по Submit больше ничего не выполнялось - делаем возврат false чтобы прервать цепчку срабатывания остальных функций
		return false;
	}

	// Back top button
	$("#backTop").hide();

	$(window).scroll( function () {

		if($(this).scrollTop() > 200){
			$("#backTop").fadeIn();
		}
		else{
			$("#backTop").fadeOut();
		}
	})


});
