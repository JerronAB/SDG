document.addEventListener('DOMContentLoaded', () => {

    // 1. Define the text for each category
    const breeds = {
        small: ['(Yorkie)', '(Boston Terrier)', '(Dachshund)', '(Pomeranian)', '(Chihuahua)'],
        medium: ['(Beagle)', '(Border Collie)', '(Poodle)', '(Aussie)', '(Bulldog)'],
        large: ['(German Shepherd)', '(Golden Retriever)', '(Labrador Retriever)', '(Great Dane)', '(Rottweiler)']
    };

    const elements = {
        small: document.getElementById('small-dog-text'),
        medium: document.getElementById('medium-dog-text'),
        large: document.getElementById('large-dog-text')
    };

    // 2. Keep track of the current text index for each category
    const indices = { small: 0, medium: 0, large: 0 };

    // 3. Define the order of the animation sequence
    const categories = ['small', 'medium', 'large'];
    let currentCategoryIndex = 0;

    // Initialize the text content with the first breed for each category
    categories.forEach(category => {
        elements[category].textContent = breeds[category][indices[category]];
    });

    // This function performs a single slide animation
    function nextSlide() {
        // Get the category to animate (e.g., 'small', then 'medium', etc.)
        const category = categories[currentCategoryIndex];
        const el = elements[category];

        // Update the index for the current category, looping back to 0 if at the end
        indices[category] = (indices[category] + 1) % breeds[category].length;
        const nextBreed = breeds[category][indices[category]];

        // Add the CSS class to trigger the @keyframes animation
        el.classList.add('sliding');

        // Halfway through the 0.5s animation, update the text content.
        // This is when the old text has slid out and the element is invisible.
        setTimeout(() => {
            el.textContent = nextBreed;
        }, 250); // 250ms is half of the 500ms animation duration

        // Remove the 'sliding' class after the animation finishes.
        // This resets it so the animation can be triggered again later.
        el.addEventListener('animationend', () => {
            el.classList.remove('sliding');
        }, { once: true }); // {once: true} ensures this listener only runs one time per animation.

        // Move to the next category for the next interval
        currentCategoryIndex = (currentCategoryIndex + 1) % categories.length;
    }

    // This actually starts the animation sequence
    setInterval(nextSlide, 1000);
});