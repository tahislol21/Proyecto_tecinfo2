document.addEventListener('DOMContentLoaded', () => {
    const mexicoMap = document.getElementById('mexico-map');
    const amphibianInfoContainer = document.getElementById('amphibian-info-container');
    const infoSectionTitle = document.getElementById('info-section-title');
    const tooltip = document.getElementById('tooltip');

    // Datos de ejemplo de anfibios por estado
    // En una aplicación real, esto podría venir de una API o una base de datos
    const stateAmphibians = {
        "Baja California": [
            {
                name: "Rana de Baja California",
                scientificName: "Lithobates catesbeianus",
                specimens: "Común",
                image: "https://via.placeholder.com/300x200/A7D9D2/2C3E50?text=Rana+BC"
            },
            {
                name: "Salamandra de Ensenada",
                scientificName: "Ensatina eschscholtzii",
                specimens: "Poco común",
                image: "https://via.placeholder.com/300x200/C0E8D7/2C3E50?text=Salamandra+Ens"
            }
        ],
        "Sonora": [
            {
                name: "Sapo Sonorense",
                scientificName: "Incilius alvarius",
                specimens: "Abundante",
                image: "https://via.placeholder.com/300x200/A7D9D2/2C3E50?text=Sapo+Sonora"
            }
        ],
        "Chihuahua": [
            {
                name: "Rana Leopardos de Chihuahua",
                scientificName: "Lithobates chiricahuensis",
                specimens: "En peligro",
                image: "https://via.placeholder.com/300x200/C0E8D7/2C3E50?text=Rana+Chihuahua"
            },
            {
                name: "Ajolote de Montaña",
                scientificName: "Ambystoma leorae",
                specimens: "Críticamente amenazado",
                image: "https://via.placeholder.com/300x200/A7D9D2/2C3E50?text=Ajolote+Montaña"
            }
        ],
        "Jalisco": [
            {
                name: "Rana de Árbol de Jalisco",
                scientificName: "Dryophytes eximius",
                specimens: "Común",
                image: "https://via.placeholder.com/300x200/A7D9D2/2C3E50?text=Rana+Jalisco"
            },
            {
                name: "Ajolote de Lago de Chapala",
                scientificName: "Ambystoma dumerilii",
                specimens: "En peligro",
                image: "https://via.placeholder.com/300x200/C0E8D7/2C3E50?text=Ajolote+Chapala"
            }
        ],
        "Ciudad de México": [
            {
                name: "Ajolote de Xochimilco",
                scientificName: "Ambystoma mexicanum",
                specimens: "Críticamente amenazado (silvestre)",
                image: "https://via.placeholder.com/300x200/A7D9D2/2C3E50?text=Ajolote+CDMX"
            }
        ]
        // Agrega más estados y sus anfibios aquí
    };

    // Event listeners para los botones de estado del mapa (paths SVG)
    mexicoMap.addEventListener('click', (event) => {
        const target = event.target;
        if (target.classList.contains('state-button')) {
            const stateName = target.dataset.stateName;

            // Remover la clase 'active' de todos los estados
            document.querySelectorAll('.state-button').forEach(button => {
                button.classList.remove('active');
            });

            // Añadir la clase 'active' al estado clickeado
            target.classList.add('active');

            displayAmphibianInfo(stateName);
        }
    });

    // Tooltip functionality
    mexicoMap.addEventListener('mouseover', (event) => {
        const target = event.target;
        if (target.classList.contains('state-button')) {
            const stateName = target.dataset.stateName;
            tooltip.textContent = stateName;
            tooltip.style.opacity = 1;
            tooltip.style.left = `${event.clientX + 15}px`;
            tooltip.style.top = `${event.clientY - 30}px`;
        }
    });

    mexicoMap.addEventListener('mousemove', (event) => {
        if (tooltip.style.opacity == 1) { // Only move if visible
            tooltip.style.left = `${event.clientX + 15}px`;
            tooltip.style.top = `${event.clientY - 30}px`;
        }
    });

    mexicoMap.addEventListener('mouseout', (event) => {
        if (event.target.classList.contains('state-button')) {
            tooltip.style.opacity = 0;
        }
    });


    function displayAmphibianInfo(stateName) {
        const amphibians = stateAmphibians[stateName];
        amphibianInfoContainer.innerHTML = ''; // Limpiar información anterior
        infoSectionTitle.textContent = `Anfibios de ${stateName}`;

        if (amphibians && amphibians.length > 0) {
            amphibians.forEach(amphibian => {
                const card = document.createElement('div');
                card.classList.add('amphibian-card');

                card.innerHTML = `
                    <img src="${amphibian.image}" alt="${amphibian.name}">
                    <h3>${amphibian.name}</h3>
                    <p><strong>Nombre Científico:</strong> ${amphibian.scientificName}</p>
                    <p><strong>Ejemplares:</strong> ${amphibian.specimens}</p>
                `;
                amphibianInfoContainer.appendChild(card);
            });
        } else {
            amphibianInfoContainer.innerHTML = `
                <p class="initial-message">No se encontró información de anfibios para ${stateName} o aún no se ha agregado.</p>
            `;
        }
    }
});
