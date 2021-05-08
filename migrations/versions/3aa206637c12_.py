"""empty message

Revision ID: 3aa206637c12
Revises: a30b6fde78f9
Create Date: 2021-05-08 13:51:49.200403

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '3aa206637c12'
down_revision = 'a30b6fde78f9'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('pet',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=True),
    sa.Column('chip_identifier', sa.String(length=50), nullable=True),
    sa.Column('img_url', sa.String(length=255), nullable=True),
    sa.Column('user_email', sa.String(), nullable=True),
    sa.ForeignKeyConstraint(['user_email'], ['user.email'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('user_contact',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('address', sa.String(length=100), nullable=True),
    sa.Column('city', sa.String(length=100), nullable=True),
    sa.Column('phone', sa.Integer(), nullable=True),
    sa.Column('user_contact_fk', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['user_contact_fk'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('vet_user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('RUN', sa.String(length=12), nullable=True),
    sa.Column('first_name', sa.String(length=50), nullable=True),
    sa.Column('father_family_name', sa.String(length=50), nullable=True),
    sa.Column('mother_family_name', sa.String(length=50), nullable=True),
    sa.Column('gender', sa.String(length=50), nullable=True),
    sa.Column('birth_date', sa.String(length=50), nullable=True),
    sa.Column('is_exotic', sa.Boolean(), nullable=True),
    sa.Column('user_fk', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['user_fk'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('pet_controls',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('pet_medication', sa.String(length=50), nullable=True),
    sa.Column('pet_exams', sa.String(length=100), nullable=True),
    sa.Column('pet_vaccines', sa.String(length=100), nullable=True),
    sa.Column('pet_controls_fk', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['pet_controls_fk'], ['pet.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('veterinary_organization',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=True),
    sa.Column('alias_name', sa.String(length=100), nullable=True),
    sa.Column('address', sa.String(length=100), nullable=True),
    sa.Column('city', sa.String(length=100), nullable=True),
    sa.Column('phone', sa.Integer(), nullable=True),
    sa.Column('email', sa.String(length=100), nullable=True),
    sa.Column('vet_user_fk', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['vet_user_fk'], ['vet_user.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.add_column('user', sa.Column('father_family_name', sa.String(length=50), nullable=True))
    op.add_column('user', sa.Column('first_name', sa.String(length=100), nullable=True))
    op.add_column('user', sa.Column('is_vet', sa.String(length=5), nullable=True))
    op.add_column('user', sa.Column('mother_family_name', sa.String(length=50), nullable=True))
    op.drop_column('user', 'is_active')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('user', sa.Column('is_active', sa.BOOLEAN(), autoincrement=False, nullable=False))
    op.drop_column('user', 'mother_family_name')
    op.drop_column('user', 'is_vet')
    op.drop_column('user', 'first_name')
    op.drop_column('user', 'father_family_name')
    op.drop_table('veterinary_organization')
    op.drop_table('pet_controls')
    op.drop_table('vet_user')
    op.drop_table('user_contact')
    op.drop_table('pet')
    # ### end Alembic commands ###