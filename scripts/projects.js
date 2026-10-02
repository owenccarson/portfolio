document.addEventListener('DOMContentLoaded', function () {
    // Fade in the whole app on load
    document.querySelector('.App').classList.add('loaded');

    // Background vector fade effect
    const bgVector = document.querySelector('.bg-vector');
    const fadeStartPoint = 800; // Start fading at 200px scroll
    const fadeEndPoint = 1100;   // Completely faded out at 600px scroll

    function updateBgVectorOpacity() {
        const scrollY = window.scrollY;
        let opacity = 0.05; // Default opacity

        if (scrollY > fadeStartPoint) {
            const fadeProgress = Math.min((scrollY - fadeStartPoint) / (fadeEndPoint - fadeStartPoint), 1);
            opacity = 0.05 * (1 - fadeProgress);
        }

        bgVector.style.opacity = opacity;
    }

    // Add scroll event listener
    window.addEventListener('scroll', updateBgVectorOpacity);

    // Project data - now with a featuredStatus property and slug
    const projects = [
        {
            id: 0,
            title: "We Collage",
            slug: "we-collage",
            date: "2025",
            description: "Programmed a web-based collage platform and gallery for interpreting trending Google search data.",
            tags: ["React", "Web Art"],
            content: "./content/we-collage.md",
            preview: "./images/we-collage/snipping.gif",
            alt: "collages made using the We Collage platform",
            status: "active",
            featuredStatus: "More"
        },
        {
            id: 0,
            title: "Handwoven Youth",
            slug: "handwoven-youth",
            date: "2025",
            description: "Built a site for an emerging youth literacy nonprofit",
            tags: ["Webflow", "Social Media"],
            content: "./content/handwoven-youth.md",
            preview: "./images/handwoven-youth/preview3.png",
            alt: "home page of the Handwoven Youth website",
            status: "active",
            featuredStatus: "Featured"
        },
        {
            id: 4,
            title: "Eternal September",
            slug: "eternal-september",
            date: "2025",
            description: "Designing and programming a wiki for a hypermedia exhibition series",
            tags: ["PHP", "HTML/CSS"],
            content: "./content/eternal-september.md",
            preview: "./images/eternal-september/preview.gif",
            alt: "navigating the Eternal September wiki",
            status: "active",
            featuredStatus: "Featured"
        },
        {
            id: 1,
            title: "Warp",
            slug: "warp",
            date: "2025",
            description: "Creating a terminal customization interface for software engineers, integrating AI",
            tags: ["UI Design", "Product Team"],
            content: "./content/warp.md",
            preview: "./images/warp/preview.png",
            alt: "three custom theme cards made with Warp",
            status: "inactive",
            featuredStatus: "Featured"
        },
        {
            id: 2,
            title: "RIHousing",
            slug: "rihousing",
            date: "2025",
            description: "Redesigning a useful housing tool for Rhode Islanders",
            tags: ["Web Design", "Design Systems"],
            content: "./content/rihousing.md",
            preview: "./images/rihousing/preview.png",
            alt: "laptop and phone previews of a redesigned RIHousing site",
            status: "active",
            featuredStatus: "More"
        },
        {
            id: 3,
            title: "Wittern",
            slug: "wittern",
            date: "2025",
            description: "Understanding a vending machine experience based on interviews with students",
            tags: ["User Personas", "Interviewing"],
            content: "./content/wittern.md",
            preview: "./images/wittern/preview.png",
            alt: "hand drawn panel of a user journey with a Wittern vending machine",
            status: "inactive",
            featuredStatus: "More"
        },
        {
            id: 4,
            title: "VSCode",
            slug: "vscode",
            date: "2025",
            description: "Improving a component in the most popular code editor",
            tags: ["Accessibility", "UI Components"],
            content: "./content/vscode.md",
            preview: "./images/vscode/preview.png",
            alt: "VSCode logo",
            status: "active",
            featuredStatus: "Featured"
        },
        
        
        {
            id: 4,
            title: "AAPI History Museum",
            slug: "vscode",
            date: "2024",
            description: "Designing and constructing panels for a travelling museum exhibit",
            tags: ["Product Design", "Graphic Design"],
            content: "./content/vscode.md",
            preview: "./images/vscode/preview.png",
            alt: "VSCode logo",
            status: "inactive",
            featuredStatus: "More"
        },
        {
            id: 4,
            title: "brown.edu",
            slug: "brown-ouc",
            date: "2024",
            description: "Building pages for Brown's official website",
            tags: ["Drupal", "CMS"],
            content: "./content/brown-ouc.md",
            preview: "./images/brown-ouc/ss1.jpeg",
            alt: "VSCode logo",
            status: "active",
            featuredStatus: "More"
        }
    ];

    // Tag colors mapping
    const tagColors = {
        "UI Design": "rgba(23, 51, 103, 0.5)",
        "Product Team": "rgb(23, 91, 51)",
        "Web Design": "rgb(104, 129, 30)",
        "Design Systems": "rgb(103, 30, 22)",
        "User Personas": "rgb(88, 26, 112)",
        "Interviewing": "rgb(18, 62, 92)",
        "Accessibility": "rgb(173, 52, 145)",
        "UI Components": "rgb(22, 128, 106)",
        "React": "rgb(81, 84, 129)",
        "Web Art": "rgb(170, 49, 158)",
        "PHP": "rgb(108, 60, 18)",
        "Linux": "rgb(113, 104, 22)",
        "Product Design": "rgb(96, 43, 119)",
        "Graphic Design": "rgb(15, 125, 103)",
        "Drupal": "rgb(10, 90, 144)",
        "CMS": "rgb(150, 122, 13)",
        "Webflow": "rgb(25, 117, 143)",
        "CSS": "rgb(117, 39, 147)",
                "Social Media": "rgb(172, 37, 93)",
                 "Cataloguing": "rgba(109, 0, 2, 0.5)",
                                  "HTML/CSS": "rgb(26, 125, 34)",

    };

    // DOM elements
    const projectIndex = document.getElementById('project-index');
    const projectContent = document.getElementById('project-content');
    const categoryLinks = document.querySelectorAll('#project-head-links .clickable');
    const selectedProjectsLink = document.getElementById('selected-projects');
    const myName = document.getElementById('logoLink');

    const activeBreadcrumb = document.getElementById('active-breadcrumb');
    const breadcrumbSeparator = document.getElementById('breadcrumb-separator');

    // State
    let activeCategory = 'Featured';
    let activeProject = null;
    const scrollThreshold = 280;
    
    // Check if we're on GitHub Pages
    const isGitHubPages = window.location.hostname.includes('github.io');
    
    // Set base URL for the project pages
    const baseUrl = window.location.pathname.replace(/\/[^\/]*$/, '/');

    // Check if we were redirected from 404.html (GitHub Pages routing workaround)
    const redirectPath = sessionStorage.getItem('redirectPath');
    if (redirectPath) {
        // Clear the stored path so it doesn't affect future page loads
        sessionStorage.removeItem('redirectPath');
        
        // Handle the redirect path
        if (redirectPath) {
            const projectSlug = redirectPath.split('/')[0]; // Get the first segment
            const project = projects.find(p => p.slug === projectSlug && p.status === 'active');
            
            if (project) {
                // We'll display this project after page setup
                setTimeout(() => selectProject(project, true), 100);
            }
        }
    }

    // Initialize the page
    setupEventListeners();
    handleUrlRouting();
    renderAboutSection();

    /**
     * Handle URL routing based on current location
     */
    function handleUrlRouting() {
        // First try hash-based routing (works everywhere)
        const hash = window.location.hash.substring(1);
        if (hash) {
            window.scrollTo({
                top: scrollThreshold
            });
            const projectByHash = projects.find(p => p.slug === hash && p.status === 'active');
            if (projectByHash) {
                selectProject(projectByHash, false);
                return;
            }
        }
        
        // Default to showing the 'Featured' projects
        selectCategory('Featured', false);
    }

    /**
     * Renders the index of projects
     * @param {Array} projectsToRender - Array of project objects to render
     */
    function renderProjectIndex(projectsToRender) {
        projectIndex.innerHTML = '';
        
        // Filter for active projects first, then by category
        const activeProjects = projectsToRender.filter(p => p.status === 'active');
        const filteredProjects = activeProjects.filter(p => activeCategory === 'Featured' ? p.featuredStatus === 'Featured' : true);

        filteredProjects.forEach(project => {
            const projectElement = document.createElement('div');
            projectElement.className = 'project-item';
            if (activeCategory === 'All') {
                projectElement.classList.add('all-project-item');
            }
            projectElement.tabIndex = 0;
            projectElement.dataset.id = project.id;
            projectElement.dataset.slug = project.slug;
            
            // Create tags HTML
            const tagsHTML = createTagsHTML(project.tags);
            
            projectElement.innerHTML = `
                <img class="rounded border" src='${project.preview}' alt="${project.alt}"></img>
                <div class="item-1">
                    <div class="tags-container">
                        ${tagsHTML}
                    </div>
                    <div class="item-title">${project.title}</div>
                    <div class="item-description">${project.description}</div>
                    <div class="item-date">${project.date}</div>
                </div>
            `;
            
            projectElement.addEventListener('click', () => {
                selectProject(project, true);
            });

            projectElement.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault(); // prevent scrolling on Space
                    selectProject(project, true);
                }
            });
            
            projectIndex.appendChild(projectElement);
        });

        // Add navigation button at the bottom
        const navigationButton = document.createElement('div');
        navigationButton.className = 'category-navigation';
        
        if (activeCategory === 'Featured') {
            navigationButton.innerHTML = `
                <button class="category-nav-btn" data-target="All">More projects →</button>
            `;
        } else if (activeCategory === 'All') {
            navigationButton.innerHTML = `
                <button class="category-nav-btn" data-target="Featured">← Featured projects</button>
            `;
        }
        
        if (navigationButton.innerHTML) {
            projectIndex.appendChild(navigationButton);
            
            // Add event listener to the navigation button
            const navBtn = navigationButton.querySelector('.category-nav-btn');
            navBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const targetCategory = e.target.dataset.target;
                selectCategory(targetCategory, true);
                if (window.scrollY > scrollThreshold) {
                    window.scrollTo({
                        top: scrollThreshold,
                        behavior: 'smooth'
                    });
                }
            });
        }
    }
    
    /**
     * Creates HTML for tag boxes
     * @param {Array} tags - Array of tag strings
     * @returns {string} - HTML string of tag elements
     */
    function createTagsHTML(tags) {
        if (!tags || !tags.length) return '';
        
        return tags.map(tag => {
            const color = tagColors[tag] || 'rgba(136, 136, 136, 0.2)'; // Default to grey if no color is found
            return `<div class="tag" style="background-color: ${color};">${tag}</div>`;
        }).join('');
    }

    /**
     * Creates HTML for the "See also:" section
     * @param {Object} currentProject - The project currently being viewed
     * @returns {string} - HTML string of the see also section
     */
    function createSeeAlsoHTML(currentProject) {
        const otherProjects = projects.filter(p => p.id !== currentProject.id && p.status === 'active');
        const shuffled = otherProjects.sort(() => 0.5 - Math.random());
        const selectedProjects = shuffled.slice(0, 3); // Get up to 3 projects

        if (selectedProjects.length === 0) return '';

        const projectPreviewsHTML = selectedProjects.map(project => {
            const tagsHTML = createTagsHTML(project.tags);
            return `
                <div class="project-item see-also-item" data-id="${project.id}" data-slug="${project.slug}">
                    <img class="rounded" src='${project.preview}' alt="${project.alt}"></img>
                    <div class="item-1">
                        <div class="tags-container">${tagsHTML}</div>
                        <div class="item-title">${project.title}</div>
                        <div class="item-description">${project.description}</div>
                    </div>
                </div>
            `;
        }).join('');

        return `
            <div class="see-also-section">
                <h3 class="see-also-title">See also:</h3>
                <div class="see-also-container">${projectPreviewsHTML}</div>
                <div class="category-navigation">
                    <button class="category-nav-btn" data-target="All">All projects →</button>
                </div>
            </div>
        `;
    }

    /**
     * Loads project content from markdown file
     * @param {string} contentPath - Path to markdown file
     */
    function loadProjectContent(contentPath) {
        projectContent.innerHTML = ''; // Clear content to prepare for new content
    
        fetch(contentPath)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to load content');
                }
                return response.text();
            })
            .then(markdownText => {
                const htmlContent = marked.parse(markdownText);
                const seeAlsoHTML = createSeeAlsoHTML(activeProject);

                projectContent.innerHTML = `
                    <div class="spacer-50"></div>
                    ${htmlContent}
                    ${seeAlsoHTML}
                    <div class="back-to-projects-container">
                        <button id="back-to-projects-btn" class="back-to-projects-btn">Back to ${activeCategory} Projects</button>
                    </div>
                    <div class="spacer-90"></div>
                `;

                // Use a small timeout to allow the DOM to update before triggering the transition
                setTimeout(() => projectContent.classList.add('loaded'), 10);
                
                // Add event listener to the back button
                document.getElementById('back-to-projects-btn').addEventListener('click', function() {
                    selectCategory(activeCategory, true);
                    window.scrollTo({
                        top: scrollThreshold
                    });
                });

                // Add event listeners for the "See also" items
                document.querySelectorAll('.see-also-item').forEach(element => {
                    element.addEventListener('click', () => {
                        const slug = element.dataset.slug;
                        const projectToSelect = projects.find(p => p.slug === slug);
                        if (projectToSelect) {
                            selectProject(projectToSelect, true);
                        }
                    });
                });

                // Add event listener for the new "More projects" button
                const seeAlsoNavBtn = document.querySelector('.see-also-section .category-nav-btn');
                if (seeAlsoNavBtn) {
                    seeAlsoNavBtn.addEventListener('click', (e) => {
                        e.preventDefault();
                        const targetCategory = e.target.dataset.target;
                        selectCategory(targetCategory, true);
                        window.scrollTo({
                            top: scrollThreshold,
                            behavior: "smooth"
                        });
                        // No scroll behavior needed here, as we are already on a project page
                    });
                }
            })
            .catch(error => {
                console.error('Error loading content:', error);
                projectContent.innerHTML = `
                    <div class="spacer-50"></div>
                    <div class="error">Failed to load content. Please try again later.</div>
                    <div class="back-to-projects-container">
                        <button id="back-to-projects-btn" class="back-to-projects-btn">Back to ${activeCategory} Projects</button>
                    </div>
                    <div class="spacer-90"></div>
                `;
                
                // Also fade in the error message
                setTimeout(() => projectContent.classList.add('loaded'), 10);

                // Add event listener to the back button even on error
                document.getElementById('back-to-projects-btn').addEventListener('click', function() {
                    selectCategory(activeCategory, true);
                    window.scrollTo({
                        top: scrollThreshold
                    });
                });
            });
    }

    /**
     * Selects a project to display
     * @param {Object} project - Project object to display
     * @param {boolean} pushState - Whether to push a new history state
     */
    function selectProject(project, pushState = true) {
        activeProject = project;
        document.title = `Owen Carson - ${project.title}`;
    
        if (pushState) {
            const state = { projectSlug: project.slug };
            history.pushState(state, ``, `${baseUrl}#${project.slug}`);
        }
    
        // Show project content and hide index
        projectIndex.style.display = 'none';
        projectContent.style.display = 'block';
        projectContent.classList.remove('loaded'); // Reset for fade-in
    
        // Update breadcrumb
        activeBreadcrumb.textContent = project.title;
        activeBreadcrumb.tabIndex = 0;

        breadcrumbSeparator.style.display = 'inline';
    
        // Load and render project content
        loadProjectContent(project.content);

        // const focusTarget = activeBreadcrumb; // adjust as needed
        // if (focusTarget) {
        //     focusTarget.setAttribute('tabindex', '-1'); // ensure it's focusable
        //     focusTarget.focus();
        // }
    
        // Handle scrolling
        const currentScrollPosition = window.scrollY;
        if (currentScrollPosition > scrollThreshold) {
            window.scrollTo({
                top: scrollThreshold
            });
        }
    
        // Update active category link
        updateActiveCategoryLink(null);
    }

    /**
     * Selects a category to filter projects
     * @param {string} category - The category to select
     * @param {boolean} pushState - Whether to push a new history state
     */
    function selectCategory(category, pushState = true) {
        activeCategory = category;
        activeProject = null;
        
        document.title = 'Owen Carson - Portfolio';

        if (pushState) {
            history.pushState({ category: category }, ``, `${baseUrl}`);
        }
        
        // Fade out current content
        projectIndex.style.opacity = '0';
        
        setTimeout(() => {
            // Update UI
            projectIndex.style.display = 'flex';
            projectContent.style.display = 'none';
            
            // Update breadcrumbs
            activeBreadcrumb.textContent = category;
            breadcrumbSeparator.style.display = 'inline';
            selectedProjectsLink.style.display = 'inline';
            
            // Render projects for the new category
            renderProjectIndex(projects);
            
            // Update active link
            updateActiveCategoryLink(category);
            
            // Fade in new content
            setTimeout(() => {
                projectIndex.style.opacity = '1';
            }, 50);
        }, 300); // Wait for fade out transition
    }
    
    /**
     * Updates the active state of category links
     * @param {string} category - The active category
     */
    function updateActiveCategoryLink(category) {
        categoryLinks.forEach(link => {
            if (link.dataset.category === category) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    /**
     * Sets up all event listeners for the page
     */
    function setupEventListeners() {
        // Project category links
        categoryLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const category = e.target.dataset.category;
                selectCategory(category, true);
                if (window.scrollY > scrollThreshold) {
                    window.scrollTo({
                        top: scrollThreshold,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Logo / Name link
        myName.addEventListener('click', (e) => {
            e.preventDefault();
            selectCategory(activeCategory, true);
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Main projects breadcrumb
        selectedProjectsLink.addEventListener('click', (e) => {
            e.preventDefault();
            selectCategory('Featured', true);
            if (window.scrollY > scrollThreshold) {
                window.scrollTo({
                    top: scrollThreshold,
                    behavior: 'smooth'
                });
            }
        });

        // Handle browser back/forward
        window.addEventListener('popstate', (e) => {
            if (e.state && e.state.projectSlug) {
                const project = projects.find(p => p.slug === e.state.projectSlug);
                if (project) {
                    selectProject(project, false);
                }
            } else if (e.state && e.state.category) {
                selectCategory(e.state.category, false);
            } else {
                // Default state
                selectCategory('Featured', false);
            }
        });
    }

    /**
     * Placeholder for rendering about section
     */
    function renderAboutSection() {
        // Your implementation for about section rendering
    }
});