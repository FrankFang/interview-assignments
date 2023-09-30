import { app } from "@/app"
import { route } from "@/routes"

route(app)

const port = 3000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
