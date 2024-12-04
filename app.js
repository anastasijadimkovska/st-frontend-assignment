let invoices = [];
const form = document.querySelector('#invoiceForm');
const invoiceList = document.querySelector('#invoiceList');
const formTitle = document.querySelector('#formTitle');
const invoiceId = document.querySelector('#invoiceId');


form.addEventListener('submit', function(event) {
    event.preventDefault();
    const id = invoiceId.value;
    //console.log(invoiceId)
    const clientName = document.querySelector('#clientName').value;
    const amount = document.querySelector('#amount').value;
    const dueDate = document.querySelector('#dueDate').value;

    if (id) { 
        const invoice = invoices.find(inv => inv.id === id);
        invoice.clientName = clientName;
        invoice.amount = amount;
        invoice.dueDate = dueDate;
    } else { 
        const newInvoice = {
            id: Date.now().toString(),
            clientName,
            amount,
            dueDate
        };
        invoices.push(newInvoice);
    }

    renderInvoices();
    form.reset();
    formTitle.textContent = 'Create Invoice';
    invoiceId.value = '';
});

function renderInvoices() {
    invoiceList.innerHTML = '';
    invoices.forEach((invoice) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${invoice.clientName}</td>
            <td>${invoice.amount}</td>
            <td>${invoice.dueDate}</td>
            <td>
                <button onclick="editInvoice('${invoice.id}')">Edit</button>
            </td>
            <td> <button>Delete</button> 
            </td>
        `;
        invoiceList.appendChild(row);
    });
}

function editInvoice(id) {
    const invoice = invoices.find(inv => inv.id === id);
    document.querySelector('#clientName').value = invoice.clientName;
    document.querySelector('#amount').value = invoice.amount;
    document.querySelector('#dueDate').value = invoice.dueDate;
    invoiceId.value = invoice.id;
    formTitle.textContent = 'Edit Invoice';
}



window.onload = renderInvoices;