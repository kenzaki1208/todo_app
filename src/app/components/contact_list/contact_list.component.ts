import { Component, OnInit } from '@angular/core';

interface Contact {
    id: number;
    name: string;
    email: string;
    phone: string;
}

@Component({
    selector: 'app-contact-list',
    templateUrl: './contact_list.component.html',
    styleUrls: ['./contact_list.component.scss']
})
export class ContactListComponent implements OnInit {
    ngOnInit(): void {
    }
    
    contacts: {name: string, phone: string} [] = [
        {name: 'Nguyễn Văn A', phone: '0912476878'},
        {name: 'Nguyễn Văn B', phone: '0912414327'},
        {name: 'Nguyễn Văn C', phone: '0979650481'},
    ]
    
    filteredContacts: {name: string, phone: string} [] = {...this.contacts};

    newContact: {name:string, phone: string} = {name: '', phone: ''};

    searchTerm: string = '';

    addContact() {
        if (this.newContact.name && this.newContact.phone) {
            this.contacts.push({...this.newContact});
            this.filterContacts();
            this.newContact = {name: '', phone: ''};
        }
    }

    deleteContact(contact: {name: string, phone: string}) {
        this.contacts = this.contacts.filter(c => c !== contact);
        this.filterContacts();
    }

    filterContacts() {
        if (this.searchTerm) {
            this.filteredContacts = this.contacts.filter(contact =>
                contact.name.toLowerCase().includes(this.searchTerm.toLowerCase())
            );
        } else {
            this.filteredContacts = [...this.contacts];
        }
    }
}