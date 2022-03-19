const express = require('express')

const hostname = '0.0.0.0';
const port = process.env.PORT || 5000
const server = express()

server.use(express.json());

const source = {
  products: [
    { id: 1, description: "Arroz parboilizado 5Kg", value: 25.00, brand: "Tio João" },
    { id: 2, description: "Maionese 250gr", value: 7.20, brand: "Helmans" },
    { id: 3, description: "Iogurte Natural 200ml", value: 2.50, brand: "Itambé" },
    { id: 4, description: "Batata Maior Palha 300gr", value: 15.20, brand: "Chipps" },
    { id: 5, description: "Nescau 400gr", value: 8.00, brand: "Nestlé" },
  ]
}

server.get('', (req, res) => {
  res.send('Node.JS - Exercício 2 - Lino Antonio Melhado Neto')
})

server.get('/products', (req, res, next) => {
  res.status(200).json(source.products)
})

server.get('/products/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  
  const product = source.products.find(p => p.id === id)
  if (!product) {
    res.status(204).json({ message: "Product not found" })
    return
  }

  res.status(200).json(product)
})

server.post('/products', (req, res, next) => {
  const payload = req.body

  if (!payload || !payload.description || !payload.value || !payload.brand) {
    res.status(400).json({ message: "Bad product payload" })
    return
  }

  let id = (source.products[source.products.length - 1].id) + 1
  source.products.push({ id, ...payload })
  res.status(201).json({ message: "Product created successfully" })  
})

server.put('/products/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  const payload = req.body

  if (!payload || !payload.description || !payload.value || !payload.brand) {
    res.status(400).json({ message: "Bad product payload" })
    return
  }

  let idx = source.products.findIndex(p => p.id === id)
  if (idx == -1) {
    res.status(204).json({ message: "Product not found" })
    return
  }

  source.products.produtos[idx] = { id, ...payload }
  res.status(200).json({ message: "Product updated successfully" })
})

server.delete('/products/:id', (req, res, next) => {
  const id = parseInt(req.params.id);

  let idx = source.products.findIndex(p => p.id === id)
  if (idx == -1) {
    res.status(204).json({ message: "Product not found" })
    return
  }

  source.products.splice(idx, 1)
  res.status(204).json({ message: "Product deleted successfully" })
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});