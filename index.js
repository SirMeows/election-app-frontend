import "https://unpkg.com/navigo"

import {
    loadTemplate, adjustForMissingHash, renderTemplate, setActiveLink
} from "./utils.js"
import { renderParties } from "./pages/show-parties.js"
import { renderCandidates} from "./pages/show-candidates.js"

window.addEventListener("load", async () => {
    const router = new Navigo("/", { hash: true })
    const templateShowParty = await loadTemplate("./pages/pages/show-parties.js")
    const templateShowCandidate = await loadTemplate("./pages/show-candidates.js")

    adjustForMissingHash()
    await router
        .hooks({
            before(done, match) {
                setActiveLink("top-nav", match.url)
                done()
            }
        })
        .on("/", ()=>renderTemplate(templateHome, "content"))
        .on("/show-[entities]", () => {
            renderTemplate(templateShowEntities, "content")
            renderEntities()
        })
        .on("/show-[entity]/:entityId", (navigoMatch) => {
            renderTemplate(templateShowEntity, "content")
            renderEntity(navigoMatch.data.entityId)
        })
})