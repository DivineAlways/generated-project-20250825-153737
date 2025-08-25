document.addEventListener('DOMContentLoaded', () => {

    const fetchData = async () => {
        try {
            const response = await fetch('assets/dummy-data.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Could not fetch dummy data:", error);
            return null;
        }
    };

    const renderCurriculum = (curriculum) => {
        const container = document.querySelector('.curriculum-container');
        if (!container || !curriculum) return;

        container.innerHTML = curriculum.map((module, index) => `
            <div class="module">
                <div class="module-header" role="button" aria-expanded="false" aria-controls="module-content-${index}">
                    <h3>${module.title}</h3>
                    <span class="toggle-icon">+</span>
                </div>
                <div class="module-content" id="module-content-${index}">
                    <p>${module.description}</p>
                    <h4>Key Topics:</h4>
                    <ul>
                        ${module.topics.map(topic => `<li>${topic}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `).join('');
    };

    const renderTestimonials = (testimonials) => {
        const grid = document.querySelector('.testimonials-grid');
        if (!grid || !testimonials) return;

        grid.innerHTML = testimonials.map(testimonial => `
            <div class="testimonial-card">
                <p class="quote">"${testimonial.quote}"</p>
                <p class="author">- ${testimonial.name}</p>
            </div>
        `).join('');
    };

    const renderFAQs = (faqs) => {
        const container = document.querySelector('.faq-container');
        if (!container || !faqs) return;

        container.innerHTML = faqs.map((faq, index) => `
            <div class="faq-item">
                <div class="faq-question" role="button" aria-expanded="false" aria-controls="faq-answer-${index}">
                    <span>${faq.question}</span>
                    <span class="toggle-icon">+</span>
                </div>
                <div class="faq-answer" id="faq-answer-${index}">
                    <p>${faq.answer}</p>
                </div>
            </div>
        `).join('');
    };

    const initAccordions = () => {
        const curriculumContainer = document.querySelector('.curriculum-container');
        if (curriculumContainer) {
            curriculumContainer.addEventListener('click', e => {
                const header = e.target.closest('.module-header');
                if (!header) return;

                const module = header.parentElement;
                const content = header.nextElementSibling;
                const isExpanded = header.getAttribute('aria-expanded') === 'true';

                module.classList.toggle('active');
                header.setAttribute('aria-expanded', !isExpanded);
                content.style.maxHeight = module.classList.contains('active') ? `${content.scrollHeight}px` : '0';
            });
        }

        const faqContainer = document.querySelector('.faq-container');
        if (faqContainer) {
            faqContainer.addEventListener('click', e => {
                const question = e.target.closest('.faq-question');
                if (!question) return;

                const item = question.parentElement;
                const answer = question.nextElementSibling;
                 const isExpanded = question.getAttribute('aria-expanded') === 'true';

                item.classList.toggle('active');
                question.setAttribute('aria-expanded', !isExpanded);
                answer.style.maxHeight = item.classList.contains('active') ? `${answer.scrollHeight}px` : '0';
            });
        }
    };
    
    const initSmoothScroll = () => {
        document.querySelectorAll('a[href^="#"], .cta-button-small, .cta-button-large').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                // For CTAs, we'll direct them to the pricing section
                const href = this.getAttribute('href') || '#pricing'; 
                if (href === '#') return;

                const targetElement = document.querySelector(href);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });
    };

    const main = async () => {
        const data = await fetchData();
        if (data) {
            renderCurriculum(data.curriculum);
            renderTestimonials(data.testimonials);
            renderFAQs(data.faqs);
            initAccordions();
            initSmoothScroll();
        }
    };

    main();
});