import { GenerateUUIDAdapter } from "@salc/core/adapters";

interface Nationality {
    id: string;
    name: string;
    extensionPhone: string;
}

export const Nationalities: Nationality[] = [
    {
        id: GenerateUUIDAdapter.generateUUID(),
        name: 'Ecuatoriano',
        extensionPhone: '+593'
    },
    {
        id: GenerateUUIDAdapter.generateUUID(),
        name: 'Colombiano',
        extensionPhone: '+57'
    },
    {
        id: GenerateUUIDAdapter.generateUUID(),
        name: 'Peruano',
        extensionPhone: '+51'
    },
    {
        id: GenerateUUIDAdapter.generateUUID(),
        name: 'Venezolano',
        extensionPhone: '+58'
    },
    {
        id: GenerateUUIDAdapter.generateUUID(),
        name: 'Chileno',
        extensionPhone: '+56'
    },
    {
        id: GenerateUUIDAdapter.generateUUID(),
        name: 'Argentino',
        extensionPhone: '+54'
    },
    {
        id: GenerateUUIDAdapter.generateUUID(),
        name: 'Brasileño',
        extensionPhone: '+55'
    },
    {
        id: GenerateUUIDAdapter.generateUUID(),
        name: 'Uruguayo',
        extensionPhone: '+598'
    },
    {
        id: GenerateUUIDAdapter.generateUUID(),
        name: 'Paraguayo',
        extensionPhone: '+595'
    },
    {
        id: GenerateUUIDAdapter.generateUUID(),
        name: 'Boliviano',
        extensionPhone: '+591'
    },
    {
        id: GenerateUUIDAdapter.generateUUID(),
        name: 'Mexicano',
        extensionPhone: '+52'
    },
    {
        id: GenerateUUIDAdapter.generateUUID(),
        name: 'Estadounidense',
        extensionPhone: '+1'
    },
    {
        id: GenerateUUIDAdapter.generateUUID(),
        name: 'Canadiense',
        extensionPhone: '+1'
    },
    {
        id: GenerateUUIDAdapter.generateUUID(),
        name: 'Español',
        extensionPhone: '+34'
    },
    {
        id: GenerateUUIDAdapter.generateUUID(),
        name: 'Italiano',
        extensionPhone: '+39'
    },
    {
        id: GenerateUUIDAdapter.generateUUID(),
        name: 'Francés',
        extensionPhone: '+33'
    },
    {
        id: GenerateUUIDAdapter.generateUUID(),
        name: 'Alemán',
        extensionPhone: '+49'
    },
    {
        id: GenerateUUIDAdapter.generateUUID(),
        name: 'Chino',
        extensionPhone: '+86'
    },
    {
        id: GenerateUUIDAdapter.generateUUID(),
        name: 'Japonés',
        extensionPhone: '+81'
    },
    {
        id: GenerateUUIDAdapter.generateUUID(),
        name: 'Coreano',
        extensionPhone: '+82'
    },
    {
        id: GenerateUUIDAdapter.generateUUID(),
        name: 'Ruso',
        extensionPhone: '+7'
    }   
];