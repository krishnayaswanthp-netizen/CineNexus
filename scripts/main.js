gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
    initHeroAnimations();
    initTalentGrid();
    initTiltEffect();
});

function initHeroAnimations() {
    gsap.to('.floater', {
        y: -30,
        duration: 2.5,
        ease: 'power1.inOut',
        stagger: {
            each: 0.5,
            yoyo: true,
            repeat: -1
        }
    });

    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;

        gsap.to('.floater', {
            x: x,
            y: y,
            rotation: x * 0.5,
            duration: 1,
            ease: 'power2.out'
        });

        gsap.to('.hero-content', {
            x: -x * 0.5,
            y: -y * 0.5,
            duration: 1,
            ease: 'power2.out'
        });
    });
}

function initTalentGrid() {
    const columns = document.querySelectorAll('.grid-col');
    const talents = [
        { role: 'Superstar', name: 'Mahesh Babu', img: 'assets/mahesh-babu.jpg' },
        { role: 'Pan-India Star', name: 'Prabhas', img: 'assets/prabhas.jpg' },
        { role: 'Legend', name: 'Rajinikanth', img: 'assets/rajinikanth.jpg' },
        { role: 'Director', name: 'Sandeep Vanga', img: 'assets/srv.jpeg' },
        { role: 'Cinematographer', name: 'k.k. senthil kumar', img: 'assets/cinematographer.jpeg' },
        { role: 'Editor', name: 'A. Sreekar Prasad', img: 'assets/editor.jpeg' },
        { role: 'Concept Art', name: 'Sketch Work', img: 'assets/sketch.jpg' },
        { role: 'Producer', name: 'Allu Aravind', img: 'assets/Allu Aravind.jpeg' },
        { role: 'Writer', name: 'Veturi Sundararama Murthy', img: 'assets/writer.jpeg' }
    ];

    talents.forEach((talent, index) => {
        const card = document.createElement('div');
        card.className = 'talent-card mb-8';
        card.innerHTML = `
            <img src="${talent.img}" alt="${talent.name}">
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6 opacity-0 hover:opacity-100 transition-opacity duration-300">
                <span class="text-accent text-xs font-bold tracking-wider uppercase mb-1">${talent.role}</span>
                <h3 class="text-xl font-serif text-white">${talent.name}</h3>
            </div>
        `;


        columns[index % columns.length].appendChild(card);
    });

    gsap.from('.talent-card', {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.talent-grid-container',
            start: 'top 80%',
        }
    });
}

function initTiltEffect() {
    const card = document.querySelector('.tilt-card');
    const container = document.querySelector('#live-set');

    container.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; 
        const y = e.clientY - rect.top;  

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10; 
        const rotateY = ((x - centerX) / centerX) * 10;

        gsap.to(card, {
            rotationX: rotateX,
            rotationY: rotateY,
            transformPerspective: 1000,
            duration: 0.5,
            ease: 'power2.out'
        });
    });

    container.addEventListener('mouseleave', () => {
        gsap.to(card, {
            rotationX: 0,
            rotationY: 0,
            duration: 0.5,
            ease: 'power2.out'
        });
    });
}
