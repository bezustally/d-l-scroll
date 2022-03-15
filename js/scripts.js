window.addEventListener('load', function() {
	const menu = document.querySelector('.menu')
	menu.addEventListener('click', function(e) {
		if (e.target.classList.contains('menu__link')) {
			e.preventDefault()

			let link = e.target
			scrollToId(link.hash)

			try {
				menu.querySelector('.menu__link-active').classList.remove('menu__link-active')
				link.classList.add('menu__link-active')
			} catch {}
		}
	})

	const scrollUpArrow = document.querySelector(".scrollUpArrow")
	scrollUpArrow.addEventListener('click', () => scrollToId("#menu"))

	window.addEventListener('scroll', function() {
		let scrolledPixels = this.scrollY
		let fullHeight = document.body.scrollHeight
		if (scrolledPixels > fullHeight * 0.6) scrollUpArrow.classList.add('scrollUpArrow-visible')
		else scrollUpArrow.classList.remove('scrollUpArrow-visible')

		const navigableAnchors = Array.from(document.querySelectorAll("h2"))
		const offsets = navigableAnchors.map(h2 => h2.offsetTop)
		const menuLinks = document.querySelectorAll('.menu__link')

		for (i = offsets.length - 1; i >= 0; i--) {
			if (scrolledPixels > offsets[i] - 100) {
				navigableAnchors[i].classList.add('scrolled')
				menuLinks[i].classList.add('menu__link-active')
				const activeLinks = Array.from(document.querySelectorAll('.menu__link-active'))
				if (activeLinks.length > 1) {
					activeLinks.pop()
					activeLinks.forEach(link => link.classList.remove('menu__link-active'))
					break
				}
			}
			else {
				navigableAnchors[i].classList.remove('scrolled')
				menuLinks[i].classList.remove('menu__link-active')
			}
		}
	})

	if (window.location.hash) scrollToId(window.location.hash)
	// for direct links with anchor

	function scrollToId(id) {
		let target = document.querySelector(id) || menu // if #anchor is not exist
		let style = getComputedStyle(menu)
		let offset = parseFloat(style.marginTop) +
								 parseFloat(style.marginBottom) +
								 parseFloat(style.borderTopWidth) +
								 parseFloat(style.borderBottomWidth) +
								 parseFloat(style.height)

		let top = target.id == "menu" ? 0 : target.getBoundingClientRect().top + window.scrollY - offset - 10
		window.scrollTo({
			top,
			behavior: "smooth"
		})
	}
})