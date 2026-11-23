/* js/main.js
 Rai Artienda (CMSC 110 - Machine Project #1)
 */

//takes an element by ID
function byId(id) {
  return document.getElementById(id);
}


// Gives preview from user choice
function questPicker() {
  var titleEl = byId("questZ-title");
  var summaryEl = byId("questZ-summary");
  var stepsEl = byId("questZ-steps");
  var radios = document.querySelectorAll('input[name="quest-goal"]');

  if (!titleEl || !summaryEl || !stepsEl || radios.length === 0) {
    return;
  }

  var quests = {
    larp: {
      title: "How does one larp",
      summary: "Agent path: probes expectation basics, maps a short dependency tree, and checks predictions step by step.",
      steps: [
        "Probe: Check what you already know about larping and yourself (via questioning)",
        "Plan: Dependency tree from full personal to larping",
        "Teach &amp; Practice: Predict why u're wrong in larping and teaches you in ur level of thinking"
      ]
    },
    CMSC110: {
      title: "CMSC 110 review in 2 days",
      summary: "Agent path: finds where your understanding of the subject ends before introducing certain topic/s",
      steps: [
        "Probe: Tests what certain extent does your knowledge in CMSC 110 hold",
        "Plan: Minimal lesson map linking from CSS, JS to PHP concepts",
        "Teach & Practice: Predict slit outcomes with a confidence slider and adapt hints only when stuck"
      ]
    },
    comProg: {
      title: "ComProg crashcourse",
      summary: "Agent path: probes expectations ot the topic, maps a learning map tailored for your pacing, and checks understanding step by step",
      steps: [
        "Probe: Checks understanding of basic N complexity,data types, arrays and experience as a programmer",
        "Plan: Maps sample problem/s with respect to the learning map",
        "Teach & Practice: guides you on how a competitive programmer thinks"
      ]
    }
  };

  //Updates the changes as per user choice
  radios.forEach(function (radio) {
    radio.addEventListener("change", function () {
      var data = quests[radio.value];
      if (!data) {
        return;
      }
      titleEl.textContent = data.title;
      summaryEl.textContent = data.summary;
      stepsEl.textContent = "";
      data.steps.forEach(function (stepText) {
        var li = document.createElement("li");
        li.textContent = stepText;
        stepsEl.appendChild(li);
      });
    });
  });
}

//text toggle from  yearly to monthly vice-versa
function billingToggle() {
  var toggleBtn = byId("billing-toggle");
  var statusEl = byId("billing-status");
  if (!toggleBtn || !statusEl) {
    return;
  }

  toggleBtn.addEventListener("click", function () {
    var isMonthly = toggleBtn.dataset.billing === "monthly";
    var nextMode = isMonthly ? "annual" : "monthly";
    toggleBtn.dataset.billing = nextMode;

    document.querySelectorAll(".tier-price").forEach(function (priceEl) {
      priceEl.textContent = nextMode === "annual" ? priceEl.dataset.annual : priceEl.dataset.monthly;
    });

    document.querySelectorAll(".tier-period").forEach(function (periodEl, index) {
      if (index === 0) {
        return; 
      }
      if (index === 1) {
        periodEl.textContent = nextMode === "annual" ? "/ month (billed yearly)" : "/ month";
      } else {
        periodEl.textContent = nextMode === "annual" ? "/ month (10 seats, yearly)" : "/ month (per 10 seats)";
      }
    });

    toggleBtn.textContent = nextMode === "annual"
      ? "Switch to Monthly Billing"
      : "Switch to Annual Billing (Save 20%)";
    statusEl.textContent = nextMode === "annual"
      ? "Showing Annual Rates (20% off)"
      : "Showing Monthly Rates";
  });
}

// Filters media type on click
function galleryFilter() {
  var grid = byId("gallery-grid");
  var countEl = byId("gallery-count");
  var buttons = document.querySelectorAll(".filter-btn");
  if (!grid || !countEl || buttons.length === 0) {
    return;
  }

  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var filter = btn.dataset.filter;
      var visible = 0;

      buttons.forEach(function (other) {
        other.classList.toggle("btn-primary", other === btn);
        other.classList.toggle("btn-secondary", other !== btn);
      });

      grid.querySelectorAll(".gallery-item").forEach(function (item) {
        var match = filter === "all" || item.dataset.category === filter;
        item.hidden = !match;
        if (match) {
          visible += 1;
        }
      });

      countEl.textContent = "Showing " + visible + " media item" + (visible === 1 ? "" : "s") + ".";
    });
  });
}

// validates input and shows confirmation
function contactForm() {
  var form = byId("contact-form");
  var feedback = byId("form-feedback");
  if (!form || !feedback) {
    return;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var name = byId("full-name").value.trim();
    var email = byId("email").value.trim();
    var topic = byId("topic").value;
    var message = byId("message").value.trim();

    if (!name || !email || email.indexOf("@") === -1 || !topic || message.length < 5) {
      feedback.textContent = "Please fill in your name, a valid email, a topic, and a short message.";
      feedback.className = "form-feedback is-error";
      return;
    }

    feedback.textContent = "Thanks, " + name + "! Your inquiry was sent (hndi tlga).";
    feedback.className = "form-feedback is-success";
    form.reset();
  });
}

questPicker();
billingToggle();
galleryFilter();
contactForm();
