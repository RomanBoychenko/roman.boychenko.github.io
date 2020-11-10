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
	

    
	

	//FORM PLACEHOLDER
	const formInputs = document.querySelectorAll('.form-field');
	for (let item of formInputs) {
		const thisPlaceholder = item.nextElementSibling;

		item.addEventListener('focus', function () {
			thisPlaceholder.classList.add('active');
		});

		item.addEventListener('blur', function () {

			if (item.value == '') {
				thisPlaceholder.classList.remove('active');
			}

		});

	}

	//FORM VALIDATE
	$('form').validate({
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
				required: 'Введите email',
				email: 'отсутсвует символ @'
			},
			theme: {
				required: 'Введите тему сообщения'
			},
			message: {
				required: 'Введите текст сообщения'
			}
		}
	})
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

	const backToTopButton = document.querySelector("#back-to-top-btn");

window.addEventListener("scroll", scrollFunction);

function scrollFunction() {
  if (window.pageYOffset > 300) { // Show backToTopButton
    if(!backToTopButton.classList.contains("btnEntrance")) {
      backToTopButton.classList.remove("btnExit");
      backToTopButton.classList.add("btnEntrance");
      backToTopButton.style.display = "block";
    }
  }
  else { // Hide backToTopButton
    if(backToTopButton.classList.contains("btnEntrance")) {
      backToTopButton.classList.remove("btnEntrance");
      backToTopButton.classList.add("btnExit");
      setTimeout(function() {
        backToTopButton.style.display = "none";
      }, 250);
    }
  }
}

backToTopButton.addEventListener("click", smoothScrollBackToTop);

// function backToTop() {
//   window.scrollTo(0, 0);
// }

function smoothScrollBackToTop() {
  const targetPosition = 0;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  const duration = 750;
  let start = null;
  
  window.requestAnimationFrame(step);

  function step(timestamp) {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    window.scrollTo(0, easeInOutCubic(progress, startPosition, distance, duration));
    if (progress < duration) window.requestAnimationFrame(step);
  }
}

function easeInOutCubic(t, b, c, d) {
	t /= d/2;
	if (t < 1) return c/2*t*t*t + b;
	t -= 2;
	return c/2*(t*t*t + 2) + b;
};

	// $("#backTop").hide();

	// $(window).scroll( function () {

	// 	if($(this).scrollTop() > 200){
	// 		$("#backTop").fadeIn();
	// 	}
	// 	else{
	// 		$("#backTop").fadeOut();
	// 	}
	// })


});
