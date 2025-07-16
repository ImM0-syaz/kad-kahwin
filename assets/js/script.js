//aos
AOS.init()

//music
var tempMusic = ''
music = document.querySelector('.music')
if (tempMusic) {
	music.src = tempMusic
}

// door mulai
function mulai() {
	// back to top
	window.scrollTo(0, 0)

	// sound door
	var soundDoor = document.querySelector('.sound-door')
	soundDoor.play()

	// door section
	var doorSection = $('#door-section')
	var doors = document.querySelectorAll('.door')
	doors.forEach(function (door, index) {
		var direction = (index === 0) ? -1 : 1
		door.style.transform = 'rotateY(' + (70 * direction) + 'deg)'
	})

	// set timeout music
	setTimeout(function () {
		// music play
		music.play()
		doorSection.css('transform','scale(6)')
	}, 600)

	// set timeout door section
	setTimeout(function () {
		doorSection.css('opacity', 0)
		$('body').removeClass('overflow-hidden')
		$('body').addClass('transition')
		doorSection.css('display', 'none')

	// 👇 TUNJUKKAN NAVBAR
	document.querySelector('.nav').classList.remove('hidden')
	}, 2000)
}

// button music
var isPlaying = true

function toggleMusic(event) {
	event.preventDefault()

	const musicButton = document.getElementById('music-button')
	
	if (isPlaying) {
		musicButton.innerHTML = '<i class="fas fa-fw fa-pause"></i>'
		musicButton.classList.remove('rotate')
		musicButton.style.transform = 'translateY(0)'
		music.pause()
	} else {
		musicButton.innerHTML = '<i class="fas fa-fw fa-compact-disc"></i>'
		musicButton.classList.add('rotate')
		music.play()
	}

	isPlaying = !isPlaying	
}

// countdown wedding
var countdownDate = new Date("Jun 01, 2026 10:00:00").getTime()

var x = setInterval(function() {
	var now = new Date().getTime()

	var distance = countdownDate - now

	var days = Math.floor(distance / (1000 * 60 * 60 * 24))
	var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
	var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
	var seconds = Math.floor((distance % (1000 * 60)) / 1000)

	document.getElementById('countdown-wedding').innerHTML = `
		<div class="col-lg-1 col-3"><div class="text-center p-2 rounded text-dark bg-light shadow-sm"><h5>${days}</h5> Hari</div></div>
        <div class="col-lg-1 col-3"><div class="text-center p-2 rounded text-dark bg-light shadow-sm"><h5>${hours}</h5> Jam</div></div>
        <div class="col-lg-1 col-3"><div class="text-center p-2 rounded text-dark bg-light shadow-sm"><h5>${minutes}</h5> Minit</div></div>
        <div class="col-lg-1 col-3"><div class="text-center p-2 rounded text-dark bg-light shadow-sm"><h5>${seconds}</h5> Saat</div></div>
	`

	if (distance < 0) {
		clearInterval(x)
		document.getElementById('countdown-wedding').innerHTML = "<span class='text-center p-3 rounded text-light m-2'><h2>Sudah dimulai!</h2></span>"
	}
}, 1000)

// nama sambutan
const urlParams = new URLSearchParams(window.location.search)
const panggilan = urlParams.get('p')
const nama = urlParams.get('n')
const namaSambutan = document.querySelector('#nama-sambutan')
namaSambutan.innerText = `${panggilan} ${nama},`

//copy text
function copyText(el)
{
	var content = jQuery(el).siblings('div.card-container').find('div.card-number').text().trim()

	var temp = document.createElement("textarea")

	document.body.appendChild(temp)

	temp.value = content.replace(/\s+/g, '')
	temp.select()

	document.execCommand("copy")

	document.body.removeChild(temp)

	jQuery(el).text('Telah di copy')

	setTimeout(function () {
		jQuery(el).html(`<i class="fas fa-regular fa-copy"></i> Copy`)
	}, 1000)
}

//rsvp


// Aktifkan dropdown menu Bootstrap
document.addEventListener('DOMContentLoaded', function () {
  var dropdownTriggerList = [].slice.call(document.querySelectorAll('.dropdown-toggle'));
  dropdownTriggerList.map(function (dropdownToggleEl) {
    return new bootstrap.Dropdown(dropdownToggleEl);
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("rsvp-form");

  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const data = new FormData(form);
    const input = form.querySelectorAll('input, select, button');
    const scriptURL = "https://script.google.com/macros/s/AKfycbx07Dr-4wc-zxddh9oikhVewXgGuXkGamLmqLCO0WwWAkayxpBiXZ40ji6onlnY69tV8Q/exec";

    input.forEach(i => i.disabled = true);

    fetch(scriptURL, {
      method: 'POST',
      body: data
    })
      .then(() => {
        form.reset();
        
        Swal.fire({
          icon: 'success',
          text: 'Pengesahan kehadiran telah dihantar!'
        });
      })
      .catch(() => {
        Swal.fire({
          icon: 'error',
          text: 'Ralat semasa menghantar RSVP.'
        });
      })
      .finally(() => {
        input.forEach(i => i.disabled = false);
      });
  });
});

