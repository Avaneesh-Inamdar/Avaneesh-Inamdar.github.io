const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
menu.addEventListener('click', () => {
  const expanded = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(expanded));
  navigation.classList.toggle('is-open', expanded);
  menu.querySelector('span').textContent = expanded ? '−' : '+';
});
navigation.addEventListener('click', (event) => {
  if (event.target.closest('a')) {
    menu.setAttribute('aria-expanded', 'false');
    navigation.classList.remove('is-open');
    menu.querySelector('span').textContent = '+';
  }
});
document.querySelector('#copy-email').addEventListener('click', async () => {
  const status = document.querySelector('#copy-status');
  try {
    await navigator.clipboard.writeText('avaneesh.inamdar@gmail.com');
    status.textContent = 'Email copied.';
  } catch {
    status.textContent = 'Select and copy the email address above.';
  }
});
const notes = {
  flash: {
    title: 'FlashLyrics',
    sections: [
      ['THE PROBLEM', 'Following lyrics should not mean leaving your music player or searching for every new track.'],
      ['THE BUILD', 'A Flutter app with native Android media-session integration detects the current song. It supports synced lyrics, tap-to-seek, a floating window over other apps, and a locally saved library. Lyric availability and playback controls depend on the source and music player.'],
      ['DELIVERY', 'Published on Google Play with 600+ users. Releases, build instructions, and current app screenshots are available in the public repository.']
    ],
    links: [['Google Play', 'https://play.google.com/store/apps/details?id=music.flashlyrics.app'], ['GitHub', 'https://github.com/Avaneesh-Inamdar/FlashLyrics']]
  },
  reedit: {
    title: 'Re-Edit PDF',
    sections: [
      ['THE PROBLEM', 'A desktop document workflow needs editing, navigation, and text recognition in one place, including when a connection is unavailable.'],
      ['THE BUILD', 'An Electron, React, and TypeScript application with text editing, annotations, signatures, forms, page management, and offline English OCR. The workspace uses PDF.js and Tesseract.js alongside other PDF libraries.'],
      ['DELIVERY', 'Windows and Linux packages are distributed through GitHub Releases, with automated tests and a GitHub Actions packaging workflow. Release notes and validation reports describe platform support and limitations.']
    ],
    links: [['Releases', 'https://github.com/Avaneesh-Inamdar/ReEdit-PDF-Reader-and-Editor/releases/latest'], ['GitHub', 'https://github.com/Avaneesh-Inamdar/ReEdit-PDF-Reader-and-Editor']]
  },
  bug: {
    title: 'BugScout',
    sections: [
      ['THE PROBLEM', 'Browser tests, accessibility checks, and performance results are often reviewed in separate tools.'],
      ['THE BUILD', 'A team project by The Unexecutables. React provides the interface, Node.js and Express serve the backend, and Playwright executes browser tests. Llama 3.1 helps generate test cases and explain failures; Firebase stores runs and authenticates users.'],
      ['DELIVERY', 'The frontend is deployed on Firebase Hosting. The platform brings generated test plans, accessibility audits, Lighthouse metrics, and shareable reports into the same workflow.']
    ],
    links: [['Visit platform', 'https://bugscout.web.app'], ['GitHub', 'https://github.com/Avaneesh-Inamdar/BugScout']]
  }
};
const dialog = document.querySelector('#project-dialog');
const content = document.querySelector('#dialog-content');
document.querySelectorAll('[data-project]').forEach(button => {
  button.addEventListener('click', () => {
    const project = notes[button.dataset.project];
    content.replaceChildren();
    const title = document.createElement('h2');
    title.id = 'dialog-title';
    title.textContent = project.title;
    content.append(title);
    project.sections.forEach(([heading, text]) => {
      const section = document.createElement('div');
      section.className = 'dialog-section';
      const h = document.createElement('h3');
      h.textContent = heading;
      const p = document.createElement('p');
      p.textContent = text;
      section.append(h, p);
      content.append(section);
    });
    const links = document.createElement('div');
    links.className = 'project-actions';
    project.links.forEach(([label, url]) => {
      const a = document.createElement('a');
      a.href = url;
      a.className = 'text-link';
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.textContent = label + ' ↗';
      links.append(a);
    });
    content.append(links);
    dialog.showModal();
  });
});
document.querySelector('#close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target === dialog) {
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  }
});
