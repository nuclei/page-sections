interface pageSections extends HTMLElement {
  isPageSections: boolean,
  _activateSection(section: pageSection),
  _deactivateSection(section: pageSection)
}
