fetch("../../assets/components/header.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("header-root").innerHTML = html;

    const page = document.body.dataset.page;
    document.querySelectorAll(".nav a").forEach(a => {
      if (a.dataset.page === page) a.classList.add("active");
    });
  })
  .catch(err => console.error("Header load failed:", err));