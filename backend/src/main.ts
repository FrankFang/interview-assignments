import { app } from "@/app"
import { route } from "@/route"

route(app)

const port = 3000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
