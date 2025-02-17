function calculateTotal() {
    const prices = { A: 157, B: 169, C: 198};
    const discounts = { A: 0.10, B: 0.05, C: 0.15 };

    let quantityA = parseInt(document.getElementById('productA').value) || 0;
    let quantityB = parseInt(document.getElementById('productB').value) || 0;
    let quantityC = parseInt(document.getElementById('productC').value) || 0;

    if (quantityA < 0 || quantityB < 0 || quantityC < 0) {
        alert('Pon un número positivo.');
        return;
    }

    if (quantityA > 100 || quantityB > 100 || quantityC > 100) {
        alert('Lo máximo que puedes pedir son 100 piezas por articulo.');
        return;
    }

    let subtotalA = quantityA * prices.A;
    let subtotalB = quantityB * prices.B;
    let subtotalC = quantityC * prices.C;

    if (quantityA >= 10) subtotalA *= (1 - discounts.A);
    if (quantityB >= 5) subtotalB *= (1 - discounts.B);
    if (quantityC >= 7) subtotalC *= (1 - discounts.C);

    let subtotal = subtotalA + subtotalB + subtotalC;
    let iva = subtotal * 0.16;
    let total = subtotal + iva;

    document.getElementById('result').innerHTML = `
        <h3>Resumen de la compra</h3>
        <p>Subtotal: $${subtotal.toFixed(2)}</p>
        <p>IVA (16%): $${iva.toFixed(2)}</p>
        <p>Total: $${total.toFixed(2)}</p>
        <p><strong>Gracias por tu compra :3</strong></p>
    `;
}