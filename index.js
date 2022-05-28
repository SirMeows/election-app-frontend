import "https://unpkg.com/navigo"

import {
    loadTemplate, adjustForMissingHash, renderTemplate, setActiveLink
} from "./utils.js"
import { renderParties } from "./pages/show-parties.js"
import { renderCandidates} from "./pages/show-candidates.js"
import { getAllCandidates, getCandidatesBySearchTerm, getCandidatesForParty } from "./fetch-facade.js"
import { initiatePartyDropdown, addCandidateHandler } from "./pages/add-candidate.js"
import { manageCandidateHandler } from "./pages/manage-candidate.js"

window.addEventListener("load", async () => {
    const router = new Navigo("/", { hash: true })
    const templateShowParties = await loadTemplate("./pages/show-parties.html")
    const templateShowCandidates = await loadTemplate("./pages/show-candidates.html")
    const templateAddCandidate = await loadTemplate("./pages/add-candidate.html")
    const templateManageCandidate = await loadTemplate("./pages/manage-candidate.html")

    adjustForMissingHash()
    await router
        .hooks({
            before(done, match) {
                setActiveLink("top-nav", match.url)
                done()
            }
        })
        .on("/show-parties", () => {
            renderTemplate(templateShowParties, "content")
            renderParties()
        })
        .on("/show-candidates", () => {
            renderTemplate(templateShowCandidates, "content")
            const candidates = getAllCandidates()
            renderCandidates(candidates)
        })

        .on("/show-candidates/:partyId", (navigoMatch) => {
            renderTemplate(templateShowCandidates, "content")
            const candidates = getCandidatesForParty(navigoMatch.data.partyId)
            renderCandidates(candidates)
        })
        .on("/add-candidate", () => {
            renderTemplate(templateAddCandidate, "content")
            initiatePartyDropdown()
            addCandidateHandler()
        })
        .on("/manage-candidate", () => {
            renderTemplate(templateManageCandidate, "content")
            //addSearchHandler
            const candidates = getCandidatesBySearchTerm()
            manageCandidateHandler(candidates)
        })
})