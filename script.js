/* =========================================================
   NCS VEHICLE AUCTION
   MAIN JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const mobileMenuButton =
        document.getElementById("mobileMenuButton");

    const mobileNavigation =
        document.getElementById("mobileNavigation");

    const siteHeader =
        document.getElementById("siteHeader");

    const vehicleSearch =
        document.getElementById("vehicleSearch");

    const vehicleCards =
        document.querySelectorAll(".vehicle-card");

    const filterButtons =
        document.querySelectorAll(".filter-button");

    const vehicleModal =
        document.getElementById("vehicleModal");

    const modalOverlay =
        document.getElementById("modalOverlay");

    const modalClose =
        document.getElementById("modalClose");

    const modalVehicleImage =
        document.getElementById("modalVehicleImage");

    const modalVehicleName =
        document.getElementById("modalVehicleName");

    const modalVehicleId =
        document.getElementById("modalVehicleId");

    const modalVehicleYear =
        document.getElementById("modalVehicleYear");

    const modalVehicleCategory =
        document.getElementById("modalVehicleCategory");

    const modalVehiclePrice =
        document.getElementById("modalVehiclePrice");

    const modalEnquiry =
        document.getElementById("modalEnquiry");

    const currentYear =
        document.getElementById("currentYear");


    /* =====================================================
       VEHICLE DATA
       
       SAMPLE DATA ONLY.
       Replace with client-approved inventory later.
    ===================================================== */

    const vehicles = {

        "Toyota Camry": {
            id: "NCS-001",
            name: "Toyota Camry",
            year: "2018",
            category: "Sedan",
            transmission: "Automatic",
            fuel: "Petrol",
            price: "₦8,500,000",
            image:
                "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=1000&q=85"
        },

        "Toyota Highlander": {
            id: "NCS-002",
            name: "Toyota Highlander",
            year: "2019",
            category: "SUV",
            transmission: "Automatic",
            fuel: "Petrol",
            price: "₦12,000,000",
            image:
                "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1000&q=85"
        },

        "Honda Accord": {
            id: "NCS-003",
            name: "Honda Accord",
            year: "2017",
            category: "Sedan",
            transmission: "Automatic",
            fuel: "Petrol",
            price: "₦7,800,000",
            image:
                "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1000&q=85"
        },

        "Lexus RX 350": {
            id: "NCS-004",
            name: "Lexus RX 350",
            year: "2020",
            category: "SUV",
            transmission: "Automatic",
            fuel: "Petrol",
            price: "₦15,500,000",
            image:
                "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=1000&q=85"
        }

    };


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    if (mobileMenuButton) {

        mobileMenuButton.addEventListener("click", () => {

            const isOpen =
                mobileNavigation.classList.toggle("open");

            mobileMenuButton.classList.toggle(
                "open",
                isOpen
            );

            mobileMenuButton.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

        });

    }


    /* =====================================================
       CLOSE MOBILE MENU WHEN LINK IS CLICKED
    ===================================================== */

    const mobileLinks =
        mobileNavigation
            ? mobileNavigation.querySelectorAll("a")
            : [];

    mobileLinks.forEach(link => {

        link.addEventListener("click", () => {

            mobileNavigation.classList.remove("open");

            mobileMenuButton.classList.remove("open");

            mobileMenuButton.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });


    /* =====================================================
       HEADER SCROLL EFFECT
    ===================================================== */

    function handleHeaderScroll() {

        if (!siteHeader) return;

        if (window.scrollY > 30) {

            siteHeader.classList.add("scrolled");

        } else {

            siteHeader.classList.remove("scrolled");

        }

    }

    window.addEventListener(
        "scroll",
        handleHeaderScroll,
        { passive: true }
    );

    handleHeaderScroll();


    /* =====================================================
       VEHICLE FILTER
    ===================================================== */

    let activeFilter = "all";


    function filterVehicles() {

        const searchTerm =
            vehicleSearch
                ? vehicleSearch.value
                    .trim()
                    .toLowerCase()
                : "";

        vehicleCards.forEach(card => {

            const category =
                card.dataset.category || "";

            const name =
                card.dataset.name || "";

            const matchesCategory =
                activeFilter === "all" ||
                category === activeFilter;

            const matchesSearch =
                name
                    .toLowerCase()
                    .includes(searchTerm);

            if (
                matchesCategory &&
                matchesSearch
            ) {

                card.classList.remove("hidden");

            } else {

                card.classList.add("hidden");

            }

        });

    }


    /* =====================================================
       SEARCH
    ===================================================== */

    if (vehicleSearch) {

        vehicleSearch.addEventListener(
            "input",
            filterVehicles
        );

    }


    /* =====================================================
       FILTER BUTTONS
    ===================================================== */

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            filterButtons.forEach(item => {

                item.classList.remove("active");

            });

            button.classList.add("active");

            activeFilter =
                button.dataset.filter || "all";

            filterVehicles();

        });

    });


    /* =====================================================
       OPEN VEHICLE MODAL
    ===================================================== */

    const viewButtons =
        document.querySelectorAll(".view-button");

    viewButtons.forEach(button => {

        button.addEventListener("click", () => {

            const vehicleName =
                button.dataset.vehicle;

            openVehicleModal(vehicleName);

        });

    });


    function openVehicleModal(vehicleName) {

        const vehicle =
            vehicles[vehicleName];

        if (!vehicle) {

            console.warn(
                "Vehicle information not found:",
                vehicleName
            );

            return;

        }


        /* Populate modal */

        modalVehicleImage.src =
            vehicle.image;

        modalVehicleImage.alt =
            vehicle.name;

        modalVehicleName.textContent =
            vehicle.name;

        modalVehicleId
